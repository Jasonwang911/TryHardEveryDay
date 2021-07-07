## Linux 基本操作

### 设置账户
1. 用root用户登录，创建work账号
```
adduser work
passwd work
```
2. 添加work的sudo权限
```
# 找到文件位置 /etc/sudoers
whereis sudoers 

# 修改权限  u 表示所有者  w 表示写权限  + 表示添加
chmod u+w /etc/sudoers

# 编辑该文件
vim /etc/sudoers 
# 找到        root ALL=(ALL)    ALL  
# 再加一行    work  ALL=(ALL)   ALL
chmod u-w /etc/sudoers
```

3. 然后使用work登录机器，输入 su , 再次输入 root账号的密码，即可拥有超级权限

### 登录信任
1. 使用work登录机器，创建 ~/.ssh/authorized_keys 文件
```
# 修改文件夹权限
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```
2. 将本级的 id.rsa.pub 内容粘贴进来
3. 退出重新登录work，将不用再输入密码

### 安装必备软件
1. git 
```
yum -y install git 
git --version 
```

2. docker
- 安装docker 
- 配置docker镜像加速
- 安装docker-compose

###

