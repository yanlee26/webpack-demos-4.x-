// 上一个监听函数的中的callback(err, data)的第二个参数,可以作为下一个监听函数的参数

const {
    AsyncSeriesWaterfallHook
} = require("tapable");

// tap
let queue1 = new AsyncSeriesWaterfallHook(['name']);
console.time('cost1');
queue1.tap('1', function (name) {
    console.log(name, 1);
    return 'lily'
});
queue1.tap('2', function (data) {
    console.log(2, data);
    return 'Tom';
});
queue1.tap('3', function (data) {
    console.log(3, data);
});
queue1.callAsync('webpack', err => {
    console.log(err);
    console.log('over');
    console.timeEnd('cost1');
});

// 执行结果:
/* 
webpack 1
2 'lily'
3 'Tom'
null
over
cost1: 5.525ms
*/
let queue2 = new AsyncSeriesWaterfallHook(['name']);
console.time('cost2');
queue2.tapAsync('1', function (name, callback) {
    setTimeout(function () {
        console.log('1: ', name);
        callback(null, 2);
    }, 1000)
});
queue2.tapAsync('2', function (data, callback) {
    setTimeout(function () {
        console.log('2: ', data);
        callback(null, 3);
    }, 2000)
});
queue2.tapAsync('3', function (data, callback) {
    setTimeout(function () {
        console.log('3: ', data);
        callback(null, 3);
    }, 3000)
});
queue2.callAsync('webpack', err => {
    console.log(err);
    console.log('over');
    console.timeEnd('cost2');
});
// 执行结果：
/* 
1:  webpack
2:  2
3:  3
null
over
cost2: 6016.889ms
*/
let queue3 = new AsyncSeriesWaterfallHook(['name']);
console.time('cost3');
queue3.tapPromise('1', function (name) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('1:', name);
            resolve('1');
        }, 1000)
    });
});
queue3.tapPromise('2', function (data, callback) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log('2:', data);
            resolve('2');
        }, 2000)
    });
});
queue3.tapPromise('3', function (data, callback) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log('3:', data);
            resolve('over');
        }, 3000)
    });
});
queue3.promise('webpack').then(err => {
    console.log(err);
    console.timeEnd('cost3');
}, err => {
    console.log(err);
    console.timeEnd('cost3');
});
// 执行结果：
/* 
1: webpack
2: 1
3: 2
over
cost3: 6016.703ms
*/
class AsyncSeriesWaterfallHook_MY {
    constructor() {
        this.hooks = [];
    }

    tapAsync(name, fn) {
        this.hooks.push(fn);
    }

    callAsync() {
        let self = this;
        var args = Array.from(arguments);

        let done = args.pop();
        console.log(args);
        let idx = 0;
        let result = null;

        function next(err, data) {
            if (idx >= self.hooks.length) return done();
            if (err) {
                return done(err);
            }
            let fn = self.hooks[idx++];
            if (idx == 1) {

                fn(...args, next);
            } else {
                fn(data, next);
            }
        }
        next();
    }
}
