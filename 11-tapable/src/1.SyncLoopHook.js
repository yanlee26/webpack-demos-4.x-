const {
    SyncLoopHook
} = require("tapable");

/**同步循环：
 * 当监听函数被触发的时候，如果该监听函数返回 true 时则这个监听函数会反复执行，
 *  如果返回 undefined 则表示退出循环
 **/ 
class SyncLoopHook_MY {
    constructor() {
        this.hook = null;
    }

    // 订阅
    tap(name, fn) {
        this.hook = fn;
    }

    // 发布
    call() {
        let result;
        do {
            result = this.hook(...arguments);
        } while (result)
    }
}

let queue = new SyncLoopHook(['name']); 

let count = 3;

queue.tap('1', function (name) {
    console.log('count: ', count--);
    if (count > 0) {
        return true;
    }
    return;
});

queue.call('webpack');

// 执行结果:
/* 
count:  3
count:  2
count:  1
*/


