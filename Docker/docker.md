## Docker 
1. 可以吧开发、测试环境，一键部署到任何一台机器上，只要该机器安装了docker 
2. 和宿主机的环境无关，docker是个隔离的环境
3. 弹性扩展、微服务是专业运维工程师的应用领域

> docker 镜像加速

## 基本概念
1. DockerHub 仓库
pull 拉 image 
push 提交 image

2. 镜像 image 
docerfile 通过 build 生成 image   
image 通过 save 生成 tar文件  
tar 通过 load 转换成 image
run 启动 容器 container 

3. 容器 container 
commit 到 image   

## 常用命令  
> 体验网址： http://labs.play-with-docker.com
> jasonwang911
> 773983210@qq.com


#### image 镜像
1. 下载镜像 docker pull <image-name>:<tag>
2. 查看所有镜像 docker images
3. 删除镜像 docker rmi <image-id>
4. 上传镜像 docker push <username>/<repository>:<tag>  要先注册 hub.docker.com

> 如果 docker image 出现 REPOSITORY 是 <none> 的情况，可以运行 docker image prune 删除

#### container 容器
1. 启动容器 docker run -p xxxx:xxxx -v=hostPath:containerPath -d --name <container-name> <image-name>
- -p 端口映射
- -v 数据卷，文件映射
- -d 后台运行
- --name 定义容器名称 

2. 查看所有容器 docker ps 加 -a 显示隐藏的容器

3. 停止容器 docker stop <container-id>

4. 删除容器 docker rm <container-id>, 加 -f 是强制删除

5. 查看容器信息，如IP地址 docker inspect <container-id>

6. 查看容器日志 docker logs <container-id>

7. 进入容器控制台 docker exec -it <container-id> /bin/sh

## Dockerfile  一个简单的配置文件，描述如何构建一个新的image镜像
1. 语法
- FROM image:version
- LABEL name="vue-back"
- LABEL version="1.0"
- WORKDIR 工作目录
- COPY 需要拷贝文件目录  目标目录
- RUN 构建镜像，可以有多个RUN
- EXPOSE 30001
- CMD 启动容器，只能有一个CMD
- ENV k1=v1  可以有多个环境变量 $k1 是环境变量 process.env.k1

2. 构建
```
# 最后的 . 指Dockerfile在当前目录下
docker build -t <name> . 
```

3. 启动
```
docker run -p xxxx:xxxx -v=hostPath:containerPath -d --name <container-name> <image-name>
```