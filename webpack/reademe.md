## dotenv
- 使用dotenv，只需要将程序的环境变量配置写在.env文件中
- 使用dotenv-expand可以在文件中设置变量

.env文件
```
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_DB=test
MONGODB_URI=mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB}
```

webpack.config.js文件
```
## yarn add dotenv-expand -S
const dotenvFile = '.env';
require('dotenv-expand')(
    require('dotenv').config({
        path: dotenvFile,
    })
);
console.log(process.env.MONGODB_HOST);
console.log(process.env.MONGODB_PORT);
console.log(process.env.MONGODB_DB);
console.log(process.env.MONGODB_URI);
```