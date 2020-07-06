// react 中的事务
class Transaction {
    perform(anyMethod,warppers) {
        warppers.forEach(warpper => warpper.initialize())
        // warpper.initialize()
        anyMethod()
        warppers.forEach(warpper => warpper.close())
        // warpper.close()
    }
}

let transaction = new Transaction()

let oldFunc = () => {
    console.log('原有的逻辑')
}

transaction.perform(oldFunc, [
    {
        initialize() {
            console.log('初始化1')
        },
        close() {
            console.log('关闭1')
        }
    },
    {
        initialize() {
            console.log('初始化2')
        },
        close() {
            console.log('关闭2')
        }
    }
])