# Lerna 简介 [https://lerna.js.org/]
Lerna是一个优化基于 git + npm 的多package项目的管理工具   
优势： 
1. 减少重复操作
2. 提升操作的标准化
- Lerna是架构优化的产物，它揭示了一个架构真理：项目复杂度提升后，就需要对项目进行架构优化。架构- 优化的主要目标往往都是以效能为核心。

## 原生脚手架开发痛点分析
1. 痛点一：重复操作
- 多Package本地link
- 多Package依赖安装
- 多Package单元测试
- 多Package代码提交
- 多Package代码发布
2. 痛点二：版本一致性
- 发布时版本一致性
- 发布后相互依赖版本升级
- package越多，管理复杂度越高

## Lerna开发脚手架流程
![Lerna开发脚手架流程](https://homework.imooc-lego.com/pages/%E5%85%AD%E7%8E%A5/images/%E7%AC%AC%E4%BA%8C%E5%91%A8lerna%E5%BC%80%E5%8F%91%E8%84%9A%E6%89%8B%E6%9E%B6%E6%B5%81%E7%A8%8B.png)