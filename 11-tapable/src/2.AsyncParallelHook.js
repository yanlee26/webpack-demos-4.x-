const {
    AsyncParallelHook
} = require("tapable");

/**异步并发：
 * 不关心监听函数的返回值
*/

let queue1 = new AsyncParallelHook(['name']);
console.time('cost');
queue1.tap('1', function (name) {
    console.log(name, 1);
});
queue1.tap('2', function (name) {
    console.log(name, 2);
});
queue1.tap('3', function (name) {
    console.log(name, 3);
});
// queue1.callAsync('webpack', err => {
//     console.timeEnd('cost');
// });

// 执行结果
/* 
webpack 1
webpack 2
webpack 3
cost: 4.520ms
*/

let queue2 = new AsyncParallelHook(['name']);
console.time('cost1');
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

// queue2.callAsync('webpack', () => {
//     console.log('over');
//     console.timeEnd('cost1');
// });

// 执行结果
/* 
webpack 1
webpack 2
webpack 3
over
time: 3004.411ms
*/

let queue3 = new AsyncParallelHook(['name']);
console.time('cost3');
queue3.tapPromise('1', function (name, cb) {
   return new Promise(function (resolve, reject) {
       setTimeout(() => {
           console.log(name, 1);
           resolve();
       }, 1000);
   });
});

queue3.tapPromise('1', function (name, cb) {
   return new Promise(function (resolve, reject) {
       setTimeout(() => {
           console.log(name, 2);
           resolve();
       }, 2000);
   });
});

queue3.tapPromise('1', function (name, cb) {
   return new Promise(function (resolve, reject) {
       setTimeout(() => {
           console.log(name, 3);
           resolve();
       }, 3000);
   });
});

queue3.promise('webpack')
   .then(() => {
       console.log('over');
       console.timeEnd('cost3');
   }, () => {
       console.log('error');
       console.timeEnd('cost3');
   });
/* 
webpack 1
webpack 2
webpack 3
over
cost3: 3007.925ms
*/
