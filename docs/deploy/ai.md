---
title: 'AI 能力'
description: 'AI 能力文档，介绍大模型接口、智能问答、向量检索和 Java 后端系统接入 AI 的工程实践。'
---

# AI 能力

如果项目需要智能客服、知识库问答、智能搜索等 AI 功能，可以在 Java 后端引入 AI 接入层。Spring 生态已经有了 `Spring AI` 这类框架，让 Java 项目对接大模型变得简单。

## 常见组件

| 组件 | 类别 | 主要作用 |
| --- | --- | --- |
| Spring AI | AI 接入框架 | Spring 生态的 AI 接入框架，统一对接各家大模型。 |
| LangChain4j | AI 应用框架 | Java 版 LangChain，构建 RAG、Agent 应用。 |
| OpenAI / Azure OpenAI | 大模型服务 | 商用大模型 API。 |
| Ollama | 本地模型 | 在本地运行开源大模型。 |
| Milvus | 向量数据库 | 专用向量数据库，存储 Embedding。 |
| pgvector | 向量扩展 | PostgreSQL 的向量检索扩展。 |
| Elasticsearch Vector Search | 向量检索 | ES 的向量检索能力。 |
| Redis Vector | 向量检索 | Redis 的向量检索能力。 |

## 典型能力组合

如果项目需要 AI 功能，可以补充：

```
Spring AI
向量数据库
Embedding 模型
RAG 知识库
大模型接口
```

## 典型场景

```
智能客服
知识库问答
文档分析
智能搜索
AI 助手
```

## 选型建议

- Java 项目对接大模型：优先 `Spring AI`，与 Spring Boot 集成最自然。
- 构建 RAG / Agent 复杂应用：`LangChain4j`。
- 向量存储：已有 PostgreSQL 用 `pgvector`，已有 ES/Redis 可复用其向量能力，独立大规模场景用 `Milvus`。
- RAG 知识库的检索部分常复用 [Elasticsearch](/storage/elasticsearch) 或向量数据库。
