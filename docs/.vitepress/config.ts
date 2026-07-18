import { defineConfig } from 'vitepress'

const siteUrl = 'https://docs.yidian601.top'

interface NavigationItem {
  text: string
  link: string
}

interface NavigationGroup {
  text: string
  collapsed: boolean
  items: NavigationItem[]
}

function sidebarToNav(groups: NavigationGroup[]) {
  return groups
    .map(({ text, items }) => ({
      text,
      items: items.filter((item) => item.text !== '概览')
    }))
    .filter((group) => group.items.length > 0)
}

const javaSidebar: NavigationGroup[] = [
  {
    text: 'Java 基础',
    collapsed: false,
    items: [
      { text: '概览', link: '/java-core/' }
    ]
  },
  {
    text: '语言基础',
    collapsed: false,
    items: [
      { text: '基础语法', link: '/java-core/basic-syntax' },
      { text: '集合框架', link: '/java-core/collections' },
      { text: '泛型', link: '/java-core/generics' },
      { text: '异常体系', link: '/java-core/exceptions' },
      { text: 'IO 与 NIO', link: '/java-core/io-nio' },
      { text: '注解与反射', link: '/java-core/annotations-reflection' }
    ]
  },
  {
    text: 'JVM',
    collapsed: false,
    items: [
      { text: '运行时内存结构', link: '/java-core/runtime-memory' },
      { text: '垃圾回收', link: '/java-core/garbage-collection' },
      { text: '类加载机制', link: '/java-core/class-loading' },
      { text: '线上问题排查', link: '/java-core/troubleshooting' },
      { text: 'JVM 启动参数', link: '/java-core/jvm-options' }
    ]
  },
  {
    text: '并发编程',
    collapsed: false,
    items: [
      { text: '线程基础', link: '/java-core/thread-basics' },
      { text: '线程安全', link: '/java-core/thread-safety' },
      { text: 'JUC 并发包', link: '/java-core/juc' },
      { text: '线程池', link: '/java-core/thread-pool' },
      { text: '锁', link: '/java-core/locks' },
      { text: '并发容器', link: '/java-core/concurrent-containers' },
      { text: 'AQS / CAS', link: '/java-core/aqs-cas' }
    ]
  },
  {
    text: 'Java 版本特性',
    collapsed: false,
    items: [
      { text: 'Java 8 特性', link: '/java-core/features/java-8' },
      { text: 'Java 9-11 特性', link: '/java-core/features/java-9-11' },
      { text: 'Java 12-17 特性', link: '/java-core/features/java-12-17' },
      { text: 'Java 18-21 特性', link: '/java-core/features/java-18-21' },
      { text: 'Java 22-25 特性', link: '/java-core/features/java-22-25' }
    ]
  }
]

const springBootItems: NavigationItem[] = [
  { text: 'Spring Boot 基础框架', link: '/framework/spring-boot' }
]

const springCloudItems: NavigationItem[] = [
  { text: 'Spring Cloud', link: '/framework/spring-cloud' },
  { text: 'OpenFeign 服务调用', link: '/framework/openfeign' }
]

const serviceGovernanceItems: NavigationItem[] = [
  { text: 'Nacos 注册配置', link: '/framework/nacos' },
  { text: 'Gateway 网关', link: '/framework/gateway' },
  { text: 'Sentinel 熔断限流', link: '/framework/sentinel' }
]

const springSidebar: NavigationGroup[] = [
  {
    text: 'Spring Framework',
    collapsed: false,
    items: [
      { text: '概览', link: '/spring-core/' },
      { text: 'IoC 与依赖注入', link: '/spring-core/ioc' },
      { text: 'AOP 面向切面', link: '/spring-core/aop' },
      { text: '事务原理', link: '/spring-core/transaction' }
    ]
  },
  {
    text: 'Spring Boot',
    collapsed: false,
    items: springBootItems
  }
]

const frameworkSidebar: NavigationGroup[] = [
  {
    text: '核心框架',
    collapsed: false,
    items: [
      { text: '概览', link: '/framework/' }
    ]
  },
  {
    text: 'Spring Boot',
    collapsed: false,
    items: springBootItems
  },
  {
    text: 'Spring Cloud 生态',
    collapsed: false,
    items: springCloudItems
  },
  {
    text: '服务治理',
    collapsed: false,
    items: serviceGovernanceItems
  }
]

const microserviceSidebar: NavigationGroup[] = [
  {
    text: '微服务',
    collapsed: false,
    items: [
      { text: '核心框架概览', link: '/framework/' }
    ]
  },
  {
    text: 'Spring Cloud 生态',
    collapsed: false,
    items: springCloudItems
  },
  {
    text: '服务治理',
    collapsed: false,
    items: serviceGovernanceItems
  }
]

const dataMiddlewareSidebar: NavigationGroup[] = [
  {
    text: '数据存储',
    collapsed: false,
    items: [
      { text: '概览', link: '/storage/' },
      { text: 'MySQL 数据库', link: '/storage/mysql' },
      { text: 'MyBatis-Plus', link: '/storage/mybatis-plus' },
      { text: 'Redis 缓存', link: '/storage/redis' },
      { text: 'Elasticsearch 搜索', link: '/storage/elasticsearch' },
      { text: '分库分表', link: '/storage/sharding' },
      { text: '分布式 ID', link: '/storage/distributed-id' },
      { text: '数据同步', link: '/storage/data-sync' }
    ]
  },
  {
    text: '消息与事务',
    collapsed: false,
    items: [
      { text: '概览', link: '/messaging/' },
      { text: 'RocketMQ', link: '/messaging/rocketmq' },
      { text: 'Kafka', link: '/messaging/kafka' },
      { text: 'Apache Pulsar', link: '/messaging/pulsar' },
      { text: 'Seata 分布式事务', link: '/messaging/seata' }
    ]
  },
  {
    text: '安全认证',
    collapsed: false,
    items: [
      { text: '概览', link: '/security/' },
      { text: 'Spring Security', link: '/security/spring-security' },
      { text: 'OAuth2 与 JWT', link: '/security/oauth2-jwt' },
      { text: 'Sa-Token', link: '/security/sa-token' },
      { text: '密钥与配置安全', link: '/security/secrets' }
    ]
  }
]

const engineeringOpsSidebar: NavigationGroup[] = [
  {
    text: '工程实践',
    collapsed: false,
    items: [
      { text: '概览', link: '/practice/' },
      { text: 'Maven 与依赖管理', link: '/practice/maven' },
      { text: '设计模式与架构', link: '/practice/design-pattern' },
      { text: 'SQL 优化与索引', link: '/practice/sql-optimization' },
      { text: 'API 设计规范', link: '/practice/api-design' }
    ]
  },
  {
    text: '工程能力',
    collapsed: false,
    items: [
      { text: '概览', link: '/engineering/' },
      { text: 'MinIO 文件存储', link: '/engineering/minio' },
      { text: 'XXL-Job 定时任务', link: '/engineering/xxl-job' },
      { text: '接口文档', link: '/engineering/api-doc' },
      { text: '测试', link: '/engineering/testing' },
      { text: '代码质量', link: '/engineering/quality' }
    ]
  },
  {
    text: '可观测性',
    collapsed: false,
    items: [
      { text: '概览', link: '/observability/' },
      { text: 'Prometheus 与 Grafana', link: '/observability/prometheus-grafana' },
      { text: 'SkyWalking 链路追踪', link: '/observability/skywalking' },
      { text: '日志', link: '/observability/logging' }
    ]
  },
  {
    text: '部署运维',
    collapsed: false,
    items: [
      { text: '概览', link: '/deploy/' },
      { text: 'Tomcat', link: '/deploy/tomcat' },
      { text: 'WebLogic', link: '/deploy/weblogic' },
      { text: 'Docker 容器化', link: '/deploy/docker' },
      { text: 'Kubernetes 编排', link: '/deploy/kubernetes' },
      { text: 'CI/CD', link: '/deploy/cicd' },
      { text: '服务网格与灰度发布', link: '/deploy/mesh' },
      { text: '数据分析', link: '/deploy/data-analysis' },
      { text: 'AI 能力', link: '/deploy/ai' }
    ]
  }
]

const interviewSidebar: NavigationGroup[] = [
  {
    text: '面试库',
    collapsed: false,
    items: [
      { text: '概览', link: '/interview/' }
    ]
  },
  {
    text: '基础与框架',
    collapsed: false,
    items: [
      { text: 'Java 高频题', link: '/interview/java' },
      { text: 'JVM 高频题', link: '/interview/jvm' },
      { text: '并发编程', link: '/interview/concurrency' },
      { text: 'JavaWeb', link: '/interview/java-web' },
      { text: 'Spring 面试题', link: '/interview/spring' },
      { text: 'Spring Boot', link: '/interview/spring-boot' },
      { text: 'Spring Cloud', link: '/interview/spring-cloud' }
    ]
  },
  {
    text: '数据与 ORM',
    collapsed: false,
    items: [
      { text: 'MySQL 面试题', link: '/interview/mysql' },
      { text: 'MyBatis 面试题', link: '/interview/mybatis' },
      { text: 'Hibernate 面试题', link: '/interview/hibernate' },
      { text: 'Redis 面试题', link: '/interview/redis' }
    ]
  },
  {
    text: '数据与中间件',
    collapsed: false,
    items: [
      { text: '消息队列', link: '/interview/mq' },
      { text: 'ZooKeeper', link: '/interview/zookeeper' },
      { text: 'Dubbo 面试题', link: '/interview/dubbo' },
      { text: '安全认证', link: '/interview/security' }
    ]
  },
  {
    text: '场景与设计',
    collapsed: false,
    items: [
      { text: '场景题', link: '/interview/scenario' },
      { text: '系统设计', link: '/interview/system-design' },
      { text: 'DevOps / 部署', link: '/interview/devops' }
    ]
  }
]

const javaNavItems = sidebarToNav(javaSidebar)
const springNavItems = sidebarToNav(springSidebar)
const microserviceNavItems = sidebarToNav(microserviceSidebar)
const dataMiddlewareNavItems = sidebarToNav(dataMiddlewareSidebar)
const engineeringOpsNavItems = sidebarToNav(engineeringOpsSidebar)
const interviewNavItems = sidebarToNav(interviewSidebar)

function canonicalPath(relativePath: string): string {
  const normalizedPath = relativePath.replace(/\\/g, '/')

  if (normalizedPath === 'index.md') return '/'
  if (normalizedPath.endsWith('/index.md')) {
    return `/${normalizedPath.slice(0, -'index.md'.length)}`
  }

  return `/${normalizedPath.replace(/\.md$/, '')}`
}

export default defineConfig({
  lang: 'zh-CN',
  title: 'Java 后端技术文档库',
  description: '企业 Java / Spring Cloud 后端开发全技术栈文档',

  base: '/',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]
  ],

  cleanUrls: true,
  lastUpdated: true,

  transformHead({ pageData, title, description }) {
    const url = new URL(canonicalPath(pageData.relativePath), siteUrl).href

    return [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { name: 'twitter:card', content: 'summary' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }]
    ]
  },

  sitemap: {
    hostname: siteUrl
  },

  markdown: {
    breaks: true
  },

  themeConfig: {
    logo: '/logo.svg',
    outline: {
      label: '本页目录'
    },
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        forceLocale: true
      }
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    sidebarMenuLabel: '文档导航',
    returnToTopLabel: '返回顶部',
    skipToContentLabel: '跳转到正文',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色主题',
    darkModeSwitchTitle: '切换到深色主题',
    notFound: {
      code: '404',
      title: '页面未找到',
      quote: '你访问的页面不存在、已移动或链接有误。',
      linkLabel: '返回首页',
      linkText: '返回首页'
    },

    nav: [
      { text: '首页', link: '/' },
      { text: '总览', link: '/overview/', activeMatch: '^/overview/' },
      {
        text: 'Java',
        activeMatch: '^/java-core/',
        items: javaNavItems
      },
      {
        text: 'Spring',
        activeMatch: '^/(spring-core/|framework/spring-boot)',
        items: springNavItems
      },
      {
        text: '微服务',
        activeMatch: '^/framework/(?:$|(?:spring-cloud|openfeign|nacos|gateway|sentinel)(?:$|/))',
        items: microserviceNavItems
      },
      {
        text: '数据与中间件',
        activeMatch: '^/(storage/|messaging/|security/)',
        items: dataMiddlewareNavItems
      },
      {
        text: '工程与运维',
        activeMatch: '^/(practice/|engineering/|observability/|deploy/)',
        items: engineeringOpsNavItems
      },
      {
        text: '面试库',
        activeMatch: '^/interview/',
        items: interviewNavItems
      }
    ],

    sidebar: {
      '/overview/': [
        {
          text: '总览',
          collapsed: false,
          items: [
            { text: '技术栈结论', link: '/overview/' },
            { text: '整体架构', link: '/overview/architecture' },
            { text: '按规模选型', link: '/overview/selection' },
            { text: '学习路线与记忆', link: '/overview/roadmap' },
            { text: '友情链接', link: '/overview/links' }
          ]
        }
      ],
      '/java-core/': javaSidebar,
      '/spring-core/': springSidebar,
      '/framework/spring-boot': springSidebar,
      '/framework/spring-cloud': microserviceSidebar,
      '/framework/openfeign': microserviceSidebar,
      '/framework/nacos': microserviceSidebar,
      '/framework/gateway': microserviceSidebar,
      '/framework/sentinel': microserviceSidebar,
      '/framework/': frameworkSidebar,
      '/storage/': dataMiddlewareSidebar,
      '/messaging/': dataMiddlewareSidebar,
      '/security/': dataMiddlewareSidebar,
      '/practice/': engineeringOpsSidebar,
      '/engineering/': engineeringOpsSidebar,
      '/observability/': engineeringOpsSidebar,
      '/deploy/': engineeringOpsSidebar,
      '/interview/': interviewSidebar
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '清除搜索条件',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有找到相关结果',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '回车键',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '向上箭头',
              navigateDownKeyAriaLabel: '向下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'Esc 键'
            }
          }
        }
      }
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/ggluoly/my-docs',
        ariaLabel: '在 GitHub 上查看本项目'
      }
    ],

    footer: {
      message: '本站内容基于 MIT 许可证发布',
      copyright: '版权所有 © 2026 Java 后端技术文档库'
    }
  }
})
