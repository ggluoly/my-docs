import DefaultTheme from 'vitepress/theme'
import type { Zoom } from 'medium-zoom'
import {
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  watch
} from 'vue'
import { onContentUpdated, useRoute } from 'vitepress'
import './custom.css'

// 路径前缀 -> 分区标识，驱动 custom.css 中的分区配色（data-section）
const SECTION_BY_PREFIX: Record<string, string> = {
  'java-core': 'java-core',
  'spring-core': 'spring-core',
  framework: 'framework',
  storage: 'storage',
  messaging: 'messaging',
  security: 'security',
  practice: 'practice',
  engineering: 'engineering',
  observability: 'observability',
  deploy: 'deploy',
  interview: 'interview',
  overview: 'overview'
}

function sectionFromPath(path: string): string {
  // 当前站点部署在根路径，取路由第一段目录名作为分区标识。
  const clean = path.replace(/^\//, '')
  const prefix = clean.split('/')[0]
  return SECTION_BY_PREFIX[prefix] ?? 'home'
}

function applySection(path: string) {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.section = sectionFromPath(path)
}

const NAV_SECTION_BY_TEXT: Record<string, string> = {
  Java: 'java',
  Spring: 'spring',
  '微服务': 'microservice',
  '数据与中间件': 'data-middleware',
  '工程与运维': 'engineering-ops',
  '面试库': 'interview'
}

function applyNavSections() {
  document.querySelectorAll<HTMLElement>('.VPNavBarMenuGroup').forEach((group) => {
    const label = group.querySelector<HTMLButtonElement>('.button')?.textContent?.trim()
    const section = label ? NAV_SECTION_BY_TEXT[label] : undefined

    if (section) group.dataset.navSection = section
    else delete group.dataset.navSection
  })
}

const zoomSelector = '.VPDoc .content img:not(a img):not(.no-zoom)'

interface ImageAttributes {
  tabindex: string | null
  role: string | null
  ariaLabel: string | null
}

export default {
  extends: DefaultTheme,
  Layout: defineComponent({
    setup() {
      const route = useRoute()
      let zoom: Zoom | undefined
      let attachedImages: HTMLImageElement[] = []
      let activeZoomTrigger: HTMLImageElement | null = null
      let imageSyncId = 0
      let zoomTask: Promise<void> = Promise.resolve()
      let outlineScrollRaf = 0
      let disposed = false
      const imageAttributes = new Map<HTMLImageElement, ImageAttributes>()

      const handleZoomOpen: EventListener = (event) => {
        activeZoomTrigger = event.currentTarget as HTMLImageElement
      }

      const handleZoomOpened: EventListener = () => {
        const overlay = document.querySelector<HTMLElement>('.medium-zoom-overlay')

        if (!overlay) return
        overlay.setAttribute('role', 'dialog')
        overlay.setAttribute('aria-modal', 'true')
        overlay.setAttribute('aria-label', '图片大图预览')
        overlay.tabIndex = -1
        overlay.focus({ preventScroll: true })

        document
          .querySelectorAll<HTMLElement>('.medium-zoom-image--opened')
          .forEach((image) => {
            image.tabIndex = -1
            image.removeAttribute('role')
            image.setAttribute('aria-hidden', 'true')
          })
      }

      const handleZoomClosed: EventListener = () => {
        const trigger = activeZoomTrigger
        activeZoomTrigger = null

        if (!disposed && trigger?.isConnected) {
          trigger.focus({ preventScroll: true })
        }
      }

      function openImageFromKeyboard(event: KeyboardEvent) {
        if (!['Enter', ' ', 'Spacebar'].includes(event.key)) return

        const image = event.currentTarget as HTMLImageElement
        event.preventDefault()
        activeZoomTrigger = image
        void zoom?.open({ target: image })
      }

      function addImageAccessibility(image: HTMLImageElement) {
        imageAttributes.set(image, {
          tabindex: image.getAttribute('tabindex'),
          role: image.getAttribute('role'),
          ariaLabel: image.getAttribute('aria-label')
        })

        const label = image.alt.trim()
          ? `查看大图：${image.alt.trim()}`
          : '查看图片大图'
        image.tabIndex = 0
        image.setAttribute('role', 'button')
        image.setAttribute('aria-label', label)
        image.addEventListener('keydown', openImageFromKeyboard)
      }

      function restoreImageAccessibility(image: HTMLImageElement) {
        const attributes = imageAttributes.get(image)
        image.removeEventListener('keydown', openImageFromKeyboard)

        if (!attributes) return
        if (attributes.tabindex === null) image.removeAttribute('tabindex')
        else image.setAttribute('tabindex', attributes.tabindex)
        if (attributes.role === null) image.removeAttribute('role')
        else image.setAttribute('role', attributes.role)
        if (attributes.ariaLabel === null) image.removeAttribute('aria-label')
        else image.setAttribute('aria-label', attributes.ariaLabel)
        imageAttributes.delete(image)
      }

      async function closeZoom() {
        if (!zoom) return

        await zoom.close()
        if (!zoom.getZoomedImage()) return

        await new Promise((resolve) => window.setTimeout(resolve, 350))
        if (zoom.getZoomedImage()) await zoom.close()
      }

      async function detachImages() {
        const images = attachedImages
        attachedImages = []

        if (zoom) {
          await closeZoom()
          if (images.length) zoom.detach(images)
        }

        images.forEach(restoreImageAccessibility)
      }

      function enqueueZoomTask(task: () => Promise<void>) {
        zoomTask = zoomTask.then(task, task).catch((error) => {
          console.error('图片缩放初始化失败', error)
        })
      }

      function requestImageSync() {
        const requestId = ++imageSyncId
        const expectedPath = route.path

        enqueueZoomTask(async () => {
          await nextTick()
          if (disposed || requestId !== imageSyncId || expectedPath !== route.path) return

          await detachImages()
          if (disposed || requestId !== imageSyncId || expectedPath !== route.path) return

          const images = Array.from(
            document.querySelectorAll<HTMLImageElement>(zoomSelector)
          )
          if (!images.length) return

          const { default: mediumZoom } = await import('medium-zoom')
          if (disposed || requestId !== imageSyncId || expectedPath !== route.path) return

          if (!zoom) {
            zoom = mediumZoom({
              background: 'var(--vp-c-bg)',
              margin: 24,
              scrollOffset: 40
            })
            zoom.on('open', handleZoomOpen)
            zoom.on('opened', handleZoomOpened)
            zoom.on('closed', handleZoomClosed)
          }

          images.forEach(addImageAccessibility)
          zoom.attach(images)
          attachedImages = images
        })
      }

      function invalidateImageSync() {
        imageSyncId += 1
        enqueueZoomTask(detachImages)
      }

      function syncActiveOutlineScroll() {
        if (outlineScrollRaf) return

        outlineScrollRaf = window.requestAnimationFrame(() => {
          outlineScrollRaf = 0

          const outline = document.querySelector<HTMLElement>('.VPDocAsideOutline')
          const activeLink = outline?.querySelector<HTMLElement>('.outline-link.active')

          if (!outline) return
          if (!activeLink) {
            if (window.scrollY < 1) outline.scrollTo({ top: 0 })
            return
          }

          const outlineRect = outline.getBoundingClientRect()
          const activeRect = activeLink.getBoundingClientRect()
          const padding = 16
          const isAbove = activeRect.top < outlineRect.top + padding
          const isBelow = activeRect.bottom > outlineRect.bottom - padding

          if (isAbove || isBelow) {
            activeLink.scrollIntoView({ block: 'nearest' })
          }
        })
      }

      function syncPageChrome() {
        applyNavSections()
        syncActiveOutlineScroll()
      }

      applySection(route.path)
      watch(() => route.path, (path) => {
        applySection(path)
        invalidateImageSync()
        void nextTick().then(syncPageChrome)
      })
      onContentUpdated(() => {
        syncPageChrome()
        requestImageSync()
      })

      onMounted(() => {
        window.addEventListener('scroll', syncActiveOutlineScroll, { passive: true })
        syncPageChrome()
      })

      onBeforeUnmount(() => {
        disposed = true
        imageSyncId += 1
        window.removeEventListener('scroll', syncActiveOutlineScroll)
        if (outlineScrollRaf) window.cancelAnimationFrame(outlineScrollRaf)
        outlineScrollRaf = 0

        enqueueZoomTask(async () => {
          await detachImages()
          zoom?.off('open', handleZoomOpen)
          zoom?.off('opened', handleZoomOpened)
          zoom?.off('closed', handleZoomClosed)
          zoom = undefined
          activeZoomTrigger = null
        })
      })

      return () => h(DefaultTheme.Layout)
    }
  })
}
