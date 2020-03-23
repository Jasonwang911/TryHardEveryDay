<!--
 * @Author: Jason wang
 * @Date: 2020-03-23 10:29:14
 * @Descripttion: 
 * @version: 
 -->
##  nginx+docker持续集成 : 使用

## CI server 和 CD server
1. CI server: 持续构建，下载代码，构建并通知CD
2. CD server：持续部署，管理配置并发布测试环境或者生产环境

## 依赖包
1. CICD 
```
// 邮件发送
 yarn add nodemailer -S
```
2. vue-font
```
yarn add axios -S
```
3. node-back
```
```

### docker
1. 服务器上安装git和配置密钥
```
yum install git -y
// 生成密钥
ssh-keygen -t rsa -b 4096 -C "773983210@qq.com"
// 查看密钥
cat /root/.ssh/id_rsa.pub
```
2. 安装nvm
```
source /root/.bashrc
nvm install stable
npm i nrm -g
nrm use taobao
npm i pm2 -g
```
3. 安装docker
```
// 安装依赖包
yum install -y yum-utils   device-mapper-persistent-data   lvm2
// 添加阿里源
yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
// 安装docker 
yum install -y docker-ce docker-ce-cli containerd.io
// 查看docker版本
docker -V
```
- 配置阿里云加速
```
// 配置文件建立
mkdir -p /etc/docker
// 写入docker源的配置
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://fwvjnv59.mirror.aliyuncs.com"]
}
EOF
# 重载所有修改过的配置文件
systemctl daemon-reload
systemctl restart docker
```
4. 配置GitHub webhook
Secret ajaxjsonp

5. 编写脚本
```
#!/bin/bash
WORK_PATH='/home/docker/vue-back'
cd $WORK_PATH
echo "1.清除原有代码"
git reset --head origin/master
git clean -f 
echo "2.拉去最新代码"
git pull origin master
echo "3.开始执行构建"
docker build -t vue-back .
```

#### docker 镜像
1. 镜像的拉去
- 从docker hub拉去docker镜像
- 自己制作 DockerFile 

2. DockerFile
```
// 在某个docker镜像离进行操作
FROM node
// 标识
LABEL name="vue-back"
LABEL version="1.0"
// 复制文件
COPY . /app
// 进入工作区
WORKDIR /app
// 执行命令
RUN npm install
// 向外暴漏的端口
EXPOSE 3000
// 执行的cmd命令操作
CMD npm start
```

3. 启动CICD服务
```
sh vue-back.sh
```

4. dockerignore
```
.gitignore
DockerFile
node_modules
```

5. docker的基本命令
```
// 拉去docker镜像
docker pull imagesName
// 查看所有的docker镜像 
docker image ls
// 
```


```
    proxy_redirect off;  
    proxy_set_header Host $host;  
    proxy_set_header X-Real-IP $remote_addr;  
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  
    proxy_pass http://127.0.0.1:79009; 
```




