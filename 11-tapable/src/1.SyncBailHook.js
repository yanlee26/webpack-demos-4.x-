const {
    SyncBailHook
} = require("tapable");

// 同步串行：只要监听函数中有一个函数的返回值不为 null，则跳过剩下所有的逻辑（惰性执行）
class SyncBailHook_MY {
    constructor() {
        this.hooks = [];
    }

    // 订阅
    tap(name, fn) {
        this.hooks.push(fn);
    }

    // 发布
    call() {
        for (let i = 0, l = this.hooks.length; i < l; i++) {
            let hook = this.hooks[i];
            let result = hook(...arguments);
            if (result) {
                break;
            }
        }
    }
}

let queue = new SyncBailHook(['name']); 

queue.tap('1', function (name) {
    console.log(name, 1);
});
queue.tap('2', function (name) {
    console.log(name, 2);
    return 'wrong'
});
queue.tap('3', function (name) {
    console.log(name, 3);
});

queue.call('webpack');

// 执行结果:
/* 
webpack 1
webpack 2
*/


