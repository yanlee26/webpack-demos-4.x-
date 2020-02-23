const {
    AsyncSeriesHook
} = require("tapable");

// tap
let queue1 = new AsyncSeriesHook(['name']);
console.time('cost1');
queue1.tap('1', function (name) {
    console.log(1);
    return "Wrong";
});
queue1.tap('2', function (name) {
    console.log(2);
});
queue1.tap('3', function (name) {
    console.log(3);
});
queue1.callAsync('zfpx', err => {
    console.log(err);
    console.timeEnd('cost1');
});
// 执行结果
/* 
1
2
3
undefined
cost1: 3.933ms
*/
let queue2 = new AsyncSeriesHook(['name']);
console.time('cost2');
queue2.tapAsync('1', function (name, cb) {
    setTimeout(() => {
        console.log(name, 1);
        cb();
    }, 1000);
});
queue2.tapAsync('2', function (name, cb) {
    setTimeout(() => {
        console.log(name, 2);
        cb();
    }, 2000);
});
queue2.tapAsync('3', function (name, cb) {
    setTimeout(() => {
        console.log(name, 3);
        cb();
    }, 3000);
});

queue2.callAsync('webpack', (err) => {
    console.log(err);
    console.log('over');
    console.timeEnd('cost2');
}); 
// 执行结果
/* 
webpack 1
webpack 2
webpack 3
undefined
over
cost2: 6019.621ms
*/
let queue3 = new AsyncSeriesHook(['name']);
console.time('cost3');
queue3.tapPromise('1',function(name){
   return new Promise(function(resolve){
       setTimeout(function(){
           console.log(name, 1);
           resolve();
       },1000)
   });
});
queue3.tapPromise('2',function(name,callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(name, 2);
            resolve();
        },2000)
    });
});
queue3.tapPromise('3',function(name,callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(name, 3);
            resolve();
        },3000)
    });
});
queue3.promise('webapck').then(err=>{
    console.log(err);
    console.timeEnd('cost3');
});

// 执行结果
/* 
webapck 1
webapck 2
webapck 3
undefined
cost3: 6021.817ms
*/

class AsyncSeriesHook_MY {
    constructor() {
        this.hooks = [];
    }

    tapAsync(name, fn) {
        this.hooks.push(fn);
    }

    callAsync() {
        var slef = this;
        var args = Array.from(arguments);
        let done = args.pop();
        let idx = 0;

        function next(err) {
            // 如果next的参数有值，就直接跳跃到 执行callAsync的回调函数
            if (err) return done(err);
            let fn = slef.hooks[idx++];
            fn ? fn(...args, next) : done();
        }
        next();
    }
}
