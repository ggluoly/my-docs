import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Java 后端技术文档库',
  description: '企业 Java / Spring Cloud 后端开发全技术栈文档',

  base: '/my-docs/',

  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: '首页', link: '/' },
      { text: '总览', link: '/overview/' },
      {
        text: '语言与框架',
        items: [
          { text: 'Java 基础', link: '/java-core/' },
          { text: 'Spring 核心', link: '/spring-core/' },
          { text: '核心框架', link: '/framework/' }
        ]
      },
      {
        text: '中间件',
        items: [
          { text: '数据存储', link: '/storage/' },
          { text: '消息与事务', link: '/messaging/' },
          { text: '安全认证', link: '/security/' }
        ]
      },
      {
        text: '工程与运维',
        items: [
          { text: '工程实践', link: '/practice/' },
          { text: '工程能力', link: '/engineering/' },
          { text: '可观测性', link: '/observability/' },
          { text: '部署运维', link: '/deploy/' }
        ]
      },
      { text: 'GitHub', link: 'https://github.com/ggluoly/my-docs' }
    ],

    sidebar: {
      '/overview/': [
        {
          text: '总览',
          items: [
            { text: '技术栈结论', link: '/overview/' },
            { text: '整体架构', link: '/overview/architecture' },
            { text: '按规模选型', link: '/overview/selection' },
            { text: '学习路线与记忆', link: '/overview/roadmap' }
          ]
        }
      ],
      '/java-core/': [
        {
          text: 'Java 基础',
          items: [
            { text: '概览', link: '/java-core/' },
            { text: '语言核心', link: '/java-core/language' },
            { text: 'JVM 原理与调优', link: '/java-core/jvm' },
            { text: '并发编程', link: '/java-core/concurrency' }
          ]
        }
      ],
      '/spring-core/': [
        {
          text: 'Spring 核心',
          items: [
            { text: '概览', link: '/spring-core/' },
            { text: 'IoC 与依赖注入', link: '/spring-core/ioc' },
            { text: 'AOP 面向切面', link: '/spring-core/aop' },
            { text: '事务原理', link: '/spring-core/transaction' }
          ]
        }
      ],
      '/framework/': [
        {
          text: '核心框架',
          items: [
            { text: '概览', link: '/framework/' },
            { text: 'Spring Boot', link: '/framework/spring-boot' },
            { text: 'Spring Cloud', link: '/framework/spring-cloud' },
            { text: 'Nacos 注册配置', link: '/framework/nacos' },
            { text: 'Gateway 网关', link: '/framework/gateway' },
            { text: 'OpenFeign 服务调用', link: '/framework/openfeign' },
            { text: 'Sentinel 熔断限流', link: '/framework/sentinel' }
          ]
        }
      ],
      '/storage/': [
        {
          text: '数据存储',
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
        }
      ],
      '/messaging/': [
        {
          text: '消息与事务',
          items: [
            { text: '概览', link: '/messaging/' },
            { text: 'RocketMQ', link: '/messaging/rocketmq' },
            { text: 'Kafka', link: '/messaging/kafka' },
            { text: 'Seata 分布式事务', link: '/messaging/seata' }
          ]
        }
      ],
      '/security/': [
        {
          text: '安全认证',
          items: [
            { text: '概览', link: '/security/' },
            { text: 'Spring Security', link: '/security/spring-security' },
            { text: 'OAuth2 与 JWT', link: '/security/oauth2-jwt' },
            { text: 'Sa-Token', link: '/security/sa-token' },
            { text: '密钥与配置安全', link: '/security/secrets' }
          ]
        }
      ],
      '/engineering/': [
        {
          text: '工程能力',
          items: [
            { text: '概览', link: '/engineering/' },
            { text: 'MinIO 文件存储', link: '/engineering/minio' },
            { text: 'XXL-Job 定时任务', link: '/engineering/xxl-job' },
            { text: '接口文档', link: '/engineering/api-doc' },
            { text: '测试', link: '/engineering/testing' },
            { text: '代码质量', link: '/engineering/quality' }
          ]
        }
      ],
      '/observability/': [
        {
          text: '可观测性',
          items: [
            { text: '概览', link: '/observability/' },
            { text: 'Prometheus 与 Grafana', link: '/observability/prometheus-grafana' },
            { text: 'SkyWalking 链路追踪', link: '/observability/skywalking' },
            { text: '日志', link: '/observability/logging' }
          ]
        }
      ],
      '/deploy/': [
        {
          text: '部署运维',
          items: [
            { text: '概览', link: '/deploy/' },
            { text: 'Docker 容器化', link: '/deploy/docker' },
            { text: 'Kubernetes 编排', link: '/deploy/kubernetes' },
            { text: 'CI/CD', link: '/deploy/cicd' },
            { text: '服务网格与灰度发布', link: '/deploy/mesh' },
            { text: '数据分析', link: '/deploy/data-analysis' },
            { text: 'AI 能力', link: '/deploy/ai' }
          ]
        }
      ]
    },

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ggluoly/my-docs' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026'
    }
  }
})
