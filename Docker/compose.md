## Docker compose
1. 基于docker和docker-compose
2. 通过一个配置文件，就可以让你的系统一键启动所有的运行环境: eg node mysql mongodb redis 

### 主要概念
> 软件设计和开发，有单一职责原则。Docker也一样，每个容器都只负责一个服务   
> 如果开发环境需要多个服务（node mysql nongodb redis），就需要启动多个Docker容器 
> 要连同这多个docker容器，就需要docker-compose

## 安装
1. pip 安装

2. 从微软镜像下载docker-compose安装包
```
curl -L http://mirror.azure.cn/docker-toolbox/linux/compose/1.25.4/docker-compose-Linux-x86_64 -o /usr/local/bin/docker-compose
```
设置权限
```
chmod +x /usr/local/bin/docker-compose
```
查看版本
```
docker-compose --version 
```

### 配置文件 
新建 docker-compose.yml 文件


### 常用命令
1. 构建容器 docker-compose build <service-name>
2. 启动所有服务器 docker-compose up -d  后台启动 -d
3. 停止所有服务 docker-compose down
4. 查看服务（当前docker-compose配置文件下的所有服务） docker-compose ps
### docker-compose 配置 Redise


### docker-compose 配置 MySQL 


### docker-compose 配置 Mongodb