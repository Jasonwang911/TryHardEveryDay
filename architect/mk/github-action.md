## Github actions 自动发布到测试机
- github actions 监听git提交，并执行自定义命令
- docker 一键部署开发环境
- 两者结合，即可自动发布到测试机
- dev 分支push时，自动部署到测试机


### 部署测试服务思路
1. 使用github actions 监听dev分支push
2. 登录测试机，获取最新dev分支代码
3. 重新构建镜像 docker-compose build editor-server 
4. 重启所有容器 docker-compose up -d