import { defineConfig } from 'vitepress'

const javaSidebar = [
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
      { text: '基础语法', link: '/java-core/language#basic-syntax' },
      { text: '集合框架', link: '/java-core/language#collections' },
      { text: '泛型', link: '/java-core/language#generics' },
      { text: '异常体系', link: '/java-core/language#exceptions' },
      { text: 'IO 与 NIO', link: '/java-core/language#io-nio' },
      { text: '注解与反射', link: '/java-core/language#annotations-reflection' },
      { text: 'Java 8+ 特性', link: '/java-core/language#java-8-plus' }
    ]
  },
  {
    text: 'JVM',
    collapsed: false,
    items: [
      { text: '运行时内存结构', link: '/java-core/jvm#runtime-memory' },
      { text: '垃圾回收', link: '/java-core/jvm#garbage-collection' },
      { text: '类加载机制', link: '/java-core/jvm#class-loading' },
      { text: '线上问题排查', link: '/java-core/jvm#troubleshooting' },
      { text: 'JVM 启动参数', link: '/java-core/jvm#jvm-options' }
    ]
  },
  {
    text: '并发编程',
    collapsed: false,
    items: [
      { text: '线程基础', link: '/java-core/concurrency#thread-basics' },
      { text: '线程安全', link: '/java-core/concurrency#thread-safety' },
      { text: 'JUC 并发包', link: '/java-core/concurrency#juc' },
      { text: '线程池', link: '/java-core/concurrency#thread-pool' },
      { text: '锁', link: '/java-core/concurrency#locks' },
      { text: '并发容器', link: '/java-core/concurrency#concurrent-containers' },
      { text: 'AQS / CAS', link: '/java-core/concurrency#aqs' },
      { text: '虚拟线程', link: '/java-core/concurrency#virtual-threads' }
    ]
  }
]

const springSidebar = [
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
    items: [
      { text: 'Spring Boot 基础框架', link: '/framework/spring-boot' }
    ]
  }
]

const frameworkSidebar = [
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
    items: [
      { text: 'Spring Boot 基础框架', link: '/framework/spring-boot' }
    ]
  },
  {
    text: 'Spring Cloud 生态',
    collapsed: false,
    items: [
      { text: 'Spring Cloud', link: '/framework/spring-cloud' },
      { text: 'OpenFeign 服务调用', link: '/framework/openfeign' }
    ]
  },
  {
    text: '服务治理',
    collapsed: false,
    items: [
      { text: 'Nacos 注册配置', link: '/framework/nacos' },
      { text: 'Gateway 网关', link: '/framework/gateway' },
      { text: 'Sentinel 熔断限流', link: '/framework/sentinel' }
    ]
  }
]

const microserviceSidebar = [
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
    items: [
      { text: 'Spring Cloud', link: '/framework/spring-cloud' },
      { text: 'OpenFeign 服务调用', link: '/framework/openfeign' }
    ]
  },
  {
    text: '服务治理',
    collapsed: false,
    items: [
      { text: 'Nacos 注册配置', link: '/framework/nacos' },
      { text: 'Gateway 网关', link: '/framework/gateway' },
      { text: 'Sentinel 熔断限流', link: '/framework/sentinel' }
    ]
  }
]

const dataMiddlewareSidebar = [
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

const engineeringOpsSidebar = [
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
      { text: 'Docker 容器化', link: '/deploy/docker' },
      { text: 'Kubernetes 编排', link: '/deploy/kubernetes' },
      { text: 'CI/CD', link: '/deploy/cicd' },
      { text: '服务网格与灰度发布', link: '/deploy/mesh' },
      { text: '数据分析', link: '/deploy/data-analysis' },
      { text: 'AI 能力', link: '/deploy/ai' }
    ]
  }
]

const interviewSidebar = [
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
      { text: 'Spring 面试题', link: '/interview/spring' },
      { text: 'Spring Boot', link: '/interview/spring-boot' },
      { text: 'Spring Cloud', link: '/interview/spring-cloud' }
    ]
  },
  {
    text: '数据与中间件',
    collapsed: false,
    items: [
      { text: 'MySQL 面试题', link: '/interview/mysql' },
      { text: 'Redis 面试题', link: '/interview/redis' },
      { text: '消息队列', link: '/interview/mq' },
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

export default defineConfig({
  title: 'Java 后端技术文档库',
  description: '企业 Java / Spring Cloud 后端开发全技术栈文档',

  base: '/',

  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: '首页', link: '/' },
      { text: '总览', link: '/overview/', activeMatch: '^/overview/' },
      {
        text: 'Java',
        activeMatch: '^/java-core/',
        items: [
          {
            text: '语言基础',
            items: [
              { text: '基础语法', link: '/java-core/language#basic-syntax' },
              { text: '集合框架', link: '/java-core/language#collections' },
              { text: '泛型', link: '/java-core/language#generics' },
              { text: '异常体系', link: '/java-core/language#exceptions' },
              { text: 'IO 与 NIO', link: '/java-core/language#io-nio' },
              { text: '注解与反射', link: '/java-core/language#annotations-reflection' },
              { text: 'Java 8+ 特性', link: '/java-core/language#java-8-plus' }
            ]
          },
          {
            text: 'JVM',
            items: [
              { text: '运行时内存结构', link: '/java-core/jvm#runtime-memory' },
              { text: '垃圾回收', link: '/java-core/jvm#garbage-collection' },
              { text: '类加载机制', link: '/java-core/jvm#class-loading' },
              { text: '线上问题排查', link: '/java-core/jvm#troubleshooting' },
              { text: 'JVM 启动参数', link: '/java-core/jvm#jvm-options' }
            ]
          },
          {
            text: '并发编程',
            items: [
              { text: '线程基础', link: '/java-core/concurrency#thread-basics' },
              { text: '线程安全', link: '/java-core/concurrency#thread-safety' },
              { text: 'JUC 并发包', link: '/java-core/concurrency#juc' },
              { text: '线程池', link: '/java-core/concurrency#thread-pool' },
              { text: '锁', link: '/java-core/concurrency#locks' },
              { text: '并发容器', link: '/java-core/concurrency#concurrent-containers' },
              { text: 'AQS / CAS', link: '/java-core/concurrency#aqs' },
              { text: '虚拟线程', link: '/java-core/concurrency#virtual-threads' }
            ]
          }
        ]
      },
      {
        text: 'Spring',
        activeMatch: '^/(spring-core/|framework/spring-boot)',
        items: [
          {
            text: 'Spring Framework',
            items: [
              { text: 'IoC 与依赖注入', link: '/spring-core/ioc' },
              { text: 'AOP 面向切面', link: '/spring-core/aop' },
              { text: '事务原理', link: '/spring-core/transaction' }
            ]
          },
          {
            text: 'Spring Boot',
            items: [
              { text: 'Spring Boot 基础框架', link: '/framework/spring-boot' }
            ]
          }
        ]
      },
      {
        text: '微服务',
        activeMatch: '^/framework/(spring-cloud|openfeign|nacos|gateway|sentinel)',
        items: [
          {
            text: 'Spring Cloud 生态',
            items: [
              { text: 'Spring Cloud', link: '/framework/spring-cloud' },
              { text: 'OpenFeign 服务调用', link: '/framework/openfeign' }
            ]
          },
          {
            text: '服务治理',
            items: [
              { text: 'Nacos 注册配置', link: '/framework/nacos' },
              { text: 'Gateway 网关', link: '/framework/gateway' },
              { text: 'Sentinel 熔断限流', link: '/framework/sentinel' }
            ]
          }
        ]
      },
      {
        text: '数据与中间件',
        activeMatch: '^/(storage/|messaging/|security/)',
        items: [
          {
            text: '数据存储',
            items: [
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
            items: [
              { text: 'RocketMQ', link: '/messaging/rocketmq' },
              { text: 'Kafka', link: '/messaging/kafka' },
              { text: 'Seata 分布式事务', link: '/messaging/seata' }
            ]
          },
          {
            text: '安全认证',
            items: [
              { text: 'Spring Security', link: '/security/spring-security' },
              { text: 'OAuth2 与 JWT', link: '/security/oauth2-jwt' },
              { text: 'Sa-Token', link: '/security/sa-token' },
              { text: '密钥与配置安全', link: '/security/secrets' }
            ]
          }
        ]
      },
      {
        text: '工程与运维',
        activeMatch: '^/(practice/|engineering/|observability/|deploy/)',
        items: [
          {
            text: '工程实践',
            items: [
              { text: 'Maven 与依赖管理', link: '/practice/maven' },
              { text: '设计模式与架构', link: '/practice/design-pattern' },
              { text: 'SQL 优化与索引', link: '/practice/sql-optimization' },
              { text: 'API 设计规范', link: '/practice/api-design' }
            ]
          },
          {
            text: '工程能力',
            items: [
              { text: 'MinIO 文件存储', link: '/engineering/minio' },
              { text: 'XXL-Job 定时任务', link: '/engineering/xxl-job' },
              { text: '接口文档', link: '/engineering/api-doc' },
              { text: '测试', link: '/engineering/testing' },
              { text: '代码质量', link: '/engineering/quality' }
            ]
          },
          {
            text: '可观测性',
            items: [
              { text: 'Prometheus 与 Grafana', link: '/observability/prometheus-grafana' },
              { text: 'SkyWalking 链路追踪', link: '/observability/skywalking' },
              { text: '日志', link: '/observability/logging' }
            ]
          },
          {
            text: '部署运维',
            items: [
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
      {
        text: '面试库',
        activeMatch: '^/interview/',
        items: [
          {
            text: '基础与框架',
            items: [
              { text: 'Java 高频题', link: '/interview/java' },
              { text: 'JVM 高频题', link: '/interview/jvm' },
              { text: '并发编程', link: '/interview/concurrency' },
              { text: 'Spring 面试题', link: '/interview/spring' },
              { text: 'Spring Boot', link: '/interview/spring-boot' },
              { text: 'Spring Cloud', link: '/interview/spring-cloud' }
            ]
          },
          {
            text: '数据与中间件',
            items: [
              { text: 'MySQL 面试题', link: '/interview/mysql' },
              { text: 'Redis 面试题', link: '/interview/redis' },
              { text: '消息队列', link: '/interview/mq' },
              { text: '安全认证', link: '/interview/security' }
            ]
          },
          {
            text: '场景与设计',
            items: [
              { text: '场景题', link: '/interview/scenario' },
              { text: '系统设计', link: '/interview/system-design' },
              { text: 'DevOps / 部署', link: '/interview/devops' }
            ]
          }
        ]
      },
      { text: 'GitHub', link: 'https://github.com/ggluoly/my-docs' }
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
            { text: '学习路线与记忆', link: '/overview/roadmap' }
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
