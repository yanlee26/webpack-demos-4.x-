const {
    SyncWaterfallHook
} = require("tapable");

// 同步串行：上一个监听函数的返回值可以传给下一个监听函数，类似 promise resolve
class SyncWaterfallHook_MY{
    constructor(){
        this.hooks = [];
    }
    
    // 订阅
    tap(name, fn){
        this.hooks.push(fn);
    }

    // 发布
    call(){
        let result = null;
        for(let i = 0, l = this.hooks.length; i < l; i++) {
            let hook = this.hooks[i];
            result = i == 0 ? hook(...arguments): hook(result); 
        }
    }
}

let queue = new SyncWaterfallHook(['name']);

// 上一个函数的返回值可以传给下一个函数
queue.tap('1', function (name) {
    console.log(name, 1);
    return 1;
});
queue.tap('2', function (data) {
    console.log(data, 2);
    return 2;
});
queue.tap('3', function (data) {
    console.log(data, 3);
});

queue.call('webpack');

// 执行结果:
/* 
webpack 1
1 2
2 3
*/
