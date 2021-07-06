-- docker-compose 启动 mysql 时初始化代码

select "init start ...";

-- 设置 root 用户外网（容器外）可访问
use mysql;
SET SQL_SAFE_UPSATES=0;  -- 解除安全模式，测试环境没关系
update user set host='%' where user='root';
flush privileges;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Mysql_2021'
flush privileges;

select "init end ...";