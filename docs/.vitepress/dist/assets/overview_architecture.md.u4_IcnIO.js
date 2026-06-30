import{_ as s,o as n,c as p,a2 as e}from"./chunks/framework.BFVZdVmd.js";const u=JSON.parse('{"title":"整体架构","description":"","frontmatter":{},"headers":[],"relativePath":"overview/architecture.md","filePath":"overview/architecture.md","lastUpdated":null}'),l={name:"overview/architecture.md"};function i(c,a,t,r,o,d){return n(),p("div",null,[...a[0]||(a[0]=[e(`<h1 id="整体架构" tabindex="-1">整体架构 <a class="header-anchor" href="#整体架构" aria-label="Permalink to &quot;整体架构&quot;">​</a></h1><p>一个典型企业 Spring Cloud 项目可以这样理解：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>前端 / App / 第三方系统</span></span>
<span class="line"><span>        |</span></span>
<span class="line"><span>        v</span></span>
<span class="line"><span>Spring Cloud Gateway</span></span>
<span class="line"><span>        |</span></span>
<span class="line"><span>        v</span></span>
<span class="line"><span>认证鉴权 / 限流 / 路由 / 日志</span></span>
<span class="line"><span>        |</span></span>
<span class="line"><span>        v</span></span>
<span class="line"><span>业务微服务集群</span></span>
<span class="line"><span>        |</span></span>
<span class="line"><span>        |-- user-service</span></span>
<span class="line"><span>        |-- order-service</span></span>
<span class="line"><span>        |-- product-service</span></span>
<span class="line"><span>        |-- payment-service</span></span>
<span class="line"><span>        |-- search-service</span></span>
<span class="line"><span>        |-- file-service</span></span>
<span class="line"><span>        |-- job-service</span></span>
<span class="line"><span>        |</span></span>
<span class="line"><span>        v</span></span>
<span class="line"><span>基础设施层</span></span>
<span class="line"><span>        |</span></span>
<span class="line"><span>        |-- Nacos</span></span>
<span class="line"><span>        |-- MySQL</span></span>
<span class="line"><span>        |-- Redis</span></span>
<span class="line"><span>        |-- Elasticsearch</span></span>
<span class="line"><span>        |-- RocketMQ / Kafka</span></span>
<span class="line"><span>        |-- MinIO / OSS</span></span>
<span class="line"><span>        |-- Seata</span></span>
<span class="line"><span>        |-- Prometheus / Grafana</span></span>
<span class="line"><span>        |-- SkyWalking / ELK</span></span></code></pre></div><h2 id="分层理解" tabindex="-1">分层理解 <a class="header-anchor" href="#分层理解" aria-label="Permalink to &quot;分层理解&quot;">​</a></h2><ul><li><strong>入口层</strong>：所有外部请求先经过 <a href="/my-docs/framework/gateway">Spring Cloud Gateway</a>，由它统一完成路由转发、鉴权、限流、跨域和日志。</li><li><strong>业务层</strong>：按业务域拆分的微服务集群，每个服务本质上都是一个独立的 Spring Boot 应用，服务之间通过 <a href="/my-docs/framework/openfeign">OpenFeign</a> 互相调用。</li><li><strong>基础设施层</strong>：注册配置中心（Nacos）、数据库、缓存、搜索、消息队列、文件存储、分布式事务、监控与日志等共享组件。</li></ul><h2 id="典型调用链" tabindex="-1">典型调用链 <a class="header-anchor" href="#典型调用链" aria-label="Permalink to &quot;典型调用链&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>前端</span></span>
<span class="line"><span>  -&gt; Gateway</span></span>
<span class="line"><span>  -&gt; user-service</span></span>
<span class="line"><span>  -&gt; order-service</span></span></code></pre></div><p>服务在启动时注册到 Nacos，Gateway 从 Nacos 发现服务并完成路由，业务服务之间通过 OpenFeign + LoadBalancer 完成声明式远程调用，调用链路由 SkyWalking / OpenTelemetry 追踪。</p>`,8)])])}const g=s(l,[["render",i]]);export{u as __pageData,g as default};
