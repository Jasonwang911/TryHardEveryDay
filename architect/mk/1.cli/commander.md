## Commander 
1. 初始化实例
- new commander.Command()  直接创建一个实例

- commander.program   commander 提供了一个 program 的单例，拿到这个单例 脚手架已经注册好了

2. 注册命令
- command 注册命令
program.command() 会得到一个返回值，这个返回值是一个新的命令对象，并不是program对象

- addCommand 注册命令
