import DefaultTheme from 'vitepress/theme'
import { defineComponent, h, nextTick, watch } from 'vue'
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

const zoomSelector = '.VPDoc .content img:not(a img):not(.no-zoom)'

let zoom: { attach: (selector: string) => void } | undefined
let outlineScrollRaf = 0

async function setupImageZoom() {
  if (typeof window === 'undefined') return

  await nextTick()
  const { default: mediumZoom } = await import('medium-zoom')

  if (!zoom) {
    zoom = mediumZoom({
      background: 'var(--vp-c-bg)',
      margin: 24,
      scrollOffset: 40
    })
  }

  zoom.attach(zoomSelector)
}

function syncActiveOutlineScroll() {
  if (typeof window === 'undefined') return
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

function setupOutlineAutoScroll() {
  if (typeof window === 'undefined') return

  syncActiveOutlineScroll()
  window.removeEventListener('scroll', syncActiveOutlineScroll)
  window.addEventListener('scroll', syncActiveOutlineScroll, { passive: true })
}

export default {
  extends: DefaultTheme,
  Layout: defineComponent({
    setup() {
      const route = useRoute()

      applySection(route.path)
      setupOutlineAutoScroll()
      watch(() => route.path, (path) => {
        applySection(path)
        setupOutlineAutoScroll()
      })
      onContentUpdated(setupImageZoom)
      onContentUpdated(setupOutlineAutoScroll)

      return () => h(DefaultTheme.Layout)
    }
  })
}
