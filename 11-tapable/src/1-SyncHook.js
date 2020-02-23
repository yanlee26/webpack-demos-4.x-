const { SyncHook } = require("tapable");

let queue = new SyncHook(['name','name2']); //所有的构造函数都接收一个可选的参数，这个参数是一个字符串的数组。

// 订阅
queue.tap('1', function (name, name2) {// tap 的第一个参数是用来标识订阅的函数的
    console.log(name, name2, 1);
    return '1'
});
queue.tap('2', function (name) {
    console.log(name, 2);
});
queue.tap('3', function (name) {
    console.log(name, 3);
});

// 发布
queue.call('webpack', 'webpack-cli');// 发布的时候触发订阅的函数 同时传入参数

// 执行结果:
/* 
webpack undefined 1 // 传入的参数需要和 new 实例的时候保持一致，否则获取不到多传的参数
webpack 2
webpack 3
*/
// 原理
class SyncHook_MY{
    constructor(){
        this.hooks = [];
    }

    // 订阅
    tap(name, fn){
        this.hooks.push(fn);
    }

    // 发布
    call(){
        this.hooks.forEach(hook => hook(...arguments));
    }
}
