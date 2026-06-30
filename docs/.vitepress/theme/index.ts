import DefaultTheme from 'vitepress/theme'
import { h, watch } from 'vue'
import { useRoute } from 'vitepress'
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

export default {
  extends: DefaultTheme,
  Layout() {
    const route = useRoute()
    // 客户端首次渲染后根据当前路由设置分区，之后随路由变化更新
    if (typeof document !== 'undefined') {
      applySection(route.path)
      watch(
        () => route.path,
        (p) => applySection(p)
      )
    }
    return h(DefaultTheme.Layout)
  }
}
