import{_ as a,o as n,c as s,a2 as e}from"./chunks/framework.BFVZdVmd.js";const u=JSON.parse('{"title":"按项目规模选型","description":"","frontmatter":{},"headers":[],"relativePath":"overview/selection.md","filePath":"overview/selection.md","lastUpdated":null}'),d={name:"overview/selection.md"};function p(o,t,r,c,i,l){return n(),s("div",null,[...t[0]||(t[0]=[e(`<h1 id="按项目规模选型" tabindex="-1">按项目规模选型 <a class="header-anchor" href="#按项目规模选型" aria-label="Permalink to &quot;按项目规模选型&quot;">​</a></h1><p>不是所有项目都必须用全部组件。应该根据项目规模、业务复杂度、团队能力逐步选择。</p><h2 id="小型单体项目" tabindex="-1">小型单体项目 <a class="header-anchor" href="#小型单体项目" aria-label="Permalink to &quot;小型单体项目&quot;">​</a></h2><table tabindex="0"><thead><tr><th>类别</th><th>选型</th></tr></thead><tbody><tr><td>基础框架</td><td><code>Spring Boot</code></td></tr><tr><td>数据库</td><td><code>MySQL</code></td></tr><tr><td>ORM</td><td><code>MyBatis-Plus</code></td></tr><tr><td>缓存</td><td><code>Redis</code></td></tr><tr><td>权限</td><td><code>Spring Security / Sa-Token</code></td></tr><tr><td>接口文档</td><td><code>Knife4j / Springdoc OpenAPI</code></td></tr><tr><td>文件存储</td><td><code>MinIO / OSS</code></td></tr><tr><td>定时任务</td><td><code>Spring Scheduler</code></td></tr><tr><td>部署</td><td><code>Docker</code></td></tr></tbody></table><h2 id="中型微服务项目" tabindex="-1">中型微服务项目 <a class="header-anchor" href="#中型微服务项目" aria-label="Permalink to &quot;中型微服务项目&quot;">​</a></h2><table tabindex="0"><thead><tr><th>类别</th><th>选型</th></tr></thead><tbody><tr><td>基础框架</td><td><code>Spring Boot + Spring Cloud</code></td></tr><tr><td>注册配置</td><td><code>Nacos</code></td></tr><tr><td>网关</td><td><code>Spring Cloud Gateway</code></td></tr><tr><td>服务调用</td><td><code>OpenFeign</code></td></tr><tr><td>熔断限流</td><td><code>Sentinel</code></td></tr><tr><td>数据库</td><td><code>MySQL</code></td></tr><tr><td>ORM</td><td><code>MyBatis-Plus</code></td></tr><tr><td>缓存</td><td><code>Redis + Redisson</code></td></tr><tr><td>搜索</td><td><code>Elasticsearch</code></td></tr><tr><td>消息队列</td><td><code>RocketMQ / Kafka</code></td></tr><tr><td>文件存储</td><td><code>MinIO / OSS</code></td></tr><tr><td>定时任务</td><td><code>XXL-Job</code></td></tr><tr><td>认证鉴权</td><td><code>Spring Security / JWT / Sa-Token</code></td></tr><tr><td>监控</td><td><code>Actuator + Prometheus + Grafana</code></td></tr><tr><td>链路追踪</td><td><code>SkyWalking / OpenTelemetry</code></td></tr><tr><td>日志</td><td><code>ELK / Loki</code></td></tr><tr><td>部署</td><td><code>Docker + Jenkins / GitLab CI</code></td></tr></tbody></table><h2 id="大型企业项目" tabindex="-1">大型企业项目 <a class="header-anchor" href="#大型企业项目" aria-label="Permalink to &quot;大型企业项目&quot;">​</a></h2><table tabindex="0"><thead><tr><th>类别</th><th>选型</th></tr></thead><tbody><tr><td>基础架构</td><td><code>Spring Boot + Spring Cloud + Spring Cloud Alibaba</code></td></tr><tr><td>注册配置</td><td><code>Nacos 集群</code></td></tr><tr><td>网关</td><td><code>Gateway / APISIX / Kong</code></td></tr><tr><td>服务治理</td><td><code>Sentinel + OpenFeign + LoadBalancer</code></td></tr><tr><td>数据库</td><td><code>MySQL / PostgreSQL 集群</code></td></tr><tr><td>分库分表</td><td><code>ShardingSphere</code></td></tr><tr><td>缓存</td><td><code>Redis Cluster + Redisson</code></td></tr><tr><td>搜索</td><td><code>Elasticsearch 集群</code></td></tr><tr><td>消息</td><td><code>RocketMQ / Kafka 集群</code></td></tr><tr><td>分布式事务</td><td><code>Seata / 事务消息 / 最终一致性</code></td></tr><tr><td>文件</td><td><code>MinIO 集群 / OSS / S3</code></td></tr><tr><td>数据同步</td><td><code>Canal / Debezium / Flink CDC</code></td></tr><tr><td>认证中心</td><td><code>OAuth2 / Keycloak / Spring Authorization Server</code></td></tr><tr><td>密钥管理</td><td><code>Vault / KMS</code></td></tr><tr><td>任务调度</td><td><code>XXL-Job / PowerJob</code></td></tr><tr><td>可观测性</td><td><code>OpenTelemetry + Prometheus + Grafana + SkyWalking</code></td></tr><tr><td>日志</td><td><code>ELK / EFK / Loki</code></td></tr><tr><td>质量平台</td><td><code>SonarQube + JaCoCo + Checkstyle</code></td></tr><tr><td>测试</td><td><code>JUnit 5 + Testcontainers + WireMock</code></td></tr><tr><td>部署</td><td><code>Kubernetes + Helm + Argo CD</code></td></tr><tr><td>镜像仓库</td><td><code>Harbor</code></td></tr><tr><td>制品仓库</td><td><code>Nexus / Artifactory</code></td></tr></tbody></table><h2 id="最常见企业组合" tabindex="-1">最常见企业组合 <a class="header-anchor" href="#最常见企业组合" aria-label="Permalink to &quot;最常见企业组合&quot;">​</a></h2><p>一个比较标准、实用、不夸张的 Spring Cloud 企业技术栈：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Spring Boot 3.x</span></span>
<span class="line"><span>Spring Cloud 202x.x</span></span>
<span class="line"><span>Spring Cloud Alibaba</span></span>
<span class="line"><span>Nacos</span></span>
<span class="line"><span>Spring Cloud Gateway</span></span>
<span class="line"><span>OpenFeign</span></span>
<span class="line"><span>Spring Cloud LoadBalancer</span></span>
<span class="line"><span>Sentinel</span></span>
<span class="line"><span>MyBatis-Plus</span></span>
<span class="line"><span>MySQL</span></span>
<span class="line"><span>Redis</span></span>
<span class="line"><span>Redisson</span></span>
<span class="line"><span>Elasticsearch</span></span>
<span class="line"><span>RocketMQ</span></span>
<span class="line"><span>XXL-Job</span></span>
<span class="line"><span>MinIO</span></span>
<span class="line"><span>Spring Security / Sa-Token</span></span>
<span class="line"><span>JWT</span></span>
<span class="line"><span>Knife4j / Springdoc OpenAPI</span></span>
<span class="line"><span>Spring Boot Actuator</span></span>
<span class="line"><span>Micrometer</span></span>
<span class="line"><span>Prometheus</span></span>
<span class="line"><span>Grafana</span></span>
<span class="line"><span>SkyWalking / OpenTelemetry</span></span>
<span class="line"><span>ELK / Loki</span></span>
<span class="line"><span>Lombok</span></span>
<span class="line"><span>MapStruct</span></span>
<span class="line"><span>JUnit 5</span></span>
<span class="line"><span>Mockito</span></span>
<span class="line"><span>Testcontainers</span></span>
<span class="line"><span>SonarQube</span></span>
<span class="line"><span>JaCoCo</span></span>
<span class="line"><span>Docker</span></span>
<span class="line"><span>Jenkins / GitLab CI</span></span>
<span class="line"><span>Harbor</span></span>
<span class="line"><span>Kubernetes</span></span></code></pre></div><h2 id="最终建议" tabindex="-1">最终建议 <a class="header-anchor" href="#最终建议" aria-label="Permalink to &quot;最终建议&quot;">​</a></h2><p>不要为了“完整”而一次性引入所有组件。实际项目推荐原则：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>先满足业务</span></span>
<span class="line"><span>再解决性能</span></span>
<span class="line"><span>再解决稳定性</span></span>
<span class="line"><span>再解决可观测性</span></span>
<span class="line"><span>再解决自动化交付</span></span>
<span class="line"><span>最后再考虑高级治理</span></span></code></pre></div><p>一个正常企业中型 Spring Cloud 项目的核心组合可以确定为：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Spring Boot + Spring Cloud + Nacos + Gateway + OpenFeign + Sentinel</span></span>
<span class="line"><span>+ MySQL + Redis + Elasticsearch + MQ + Security + XXL-Job + MinIO</span></span>
<span class="line"><span>+ Actuator + Prometheus + Grafana + SkyWalking + Docker</span></span></code></pre></div><p>大型项目再逐步补充：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Seata / ShardingSphere / Canal / Debezium / Vault</span></span>
<span class="line"><span>OpenTelemetry / ELK / Loki / Kubernetes / Helm / Istio</span></span>
<span class="line"><span>SonarQube / Testcontainers / GitLab CI / Jenkins / Harbor</span></span></code></pre></div>`,18)])])}const b=a(d,[["render",p]]);export{u as __pageData,b as default};
