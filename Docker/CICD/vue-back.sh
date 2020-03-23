#!/bin/bash
WORK_PATH='/home/docker/vue-back'
cd $WORK_PATH
echo "1.清除原有代码"
git reset --hard origin/master
git clean -f 
echo "2.拉去最新代码"
git pull origin master
echo "3.开始执行构建"
docker build -t vue-back:1.0 .
echo "4.停止旧容器并删除旧容器"
docker stop vue-back-container
docker rm vue-back-container
echo "5.启动新容器"
docker container run -p 30001:30001 --name vue-back-container -d vue-back:1.0

