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

## Lerna 的使用

安装依赖
```
npm init -y

npm install lerna -D

// 初始化 执行过后会自动创建lerna.json、packages文件夹和git配置
lerna init

```

1. 脚手架项目初始化
- lerna init
会自动完成git初始化，但不会创建.gitignore文件，这个必须要手动添加，否则会将node_modules目录都上传到git，如果node_modules已经加入到git stage，可使用：
```
git reset HEAD <file>
```
执行unstage操作，如果文件已经被git监听到变更，可使用：
```
git checkout -- <filename>
```
将变更作废，记得在执行操作之前将文件加入：.gitignore


2. 创建 package 
- lerna add
> 第一个参数：添加npm包名
> 第二个参数：本地package的路径
> 选项：--dev：将依赖安装到devDependencies，不加时安装到dependencies
```
lerna add <package>[@version] [--dev] [--exact]
```
--dev devDependencies 替代 dependencies   
--exact 安装准确版本，就是安装的包版本前面不带^, Eg: "^2.20.0" ➜ "2.20.0"


3. 脚手架开发和测试
- lerna link
如果未发布上线，需要手动将依赖添加到package.json，再执行npm link

- lerna clean
只会删除node_modules，不会删除package.json中的依赖

- erna exec和lerna run
--scope属性后添加的是包名，而不是package的路径，这点和lerna add用法不同

4. 脚手架发布上线
- lerna publish
-发布时会自动执行：git add package-lock.json，所以package-lock.json不要加入.gitignore文件
-先创建远程仓库，并且同步一次master分支
-执行lerna publish前先完成npm login
-如果发布的npm包名为：@xxx/yyy的格式，需要先在npm注册名为：xxx的organization，否则可能会提交不成功
-发布到npm group时默认为private，所以我们需要手动在package.json中添加如下设置
```
"publishConfig":{
  "access":"public"
}
```

5. lerna bootstrap
npm install  
--ignore-scripts   不执行声明周期脚本命令


### 项目所用的包:   为每个包安装依赖, 链接相互依赖的库到具体的目录,执行 npm run prepublish, 执行 npm run prepare
- core
- utils

1. @boya-cli-dev/core  @符号后面的是组织名称，需要在npm上创建组织，为了防止包名重复 


### Lerna 原理
- 通过import-local来优先调用本地lerna命令
- 通过Yargs初始化脚手架，然后注册全局属性，再注册命令，最后通过parse方法解析参数
- lerna命令注册时需要传入build和handler两个函数，build用来注册命令专属的options，handler用来处理命令的业务逻辑
- lerna通过配置npm本地依赖的方式进行本地开发，具体写法是在package.json中写入：- file:your-locale-module-path,在lerna publish的时候会自动替换路径