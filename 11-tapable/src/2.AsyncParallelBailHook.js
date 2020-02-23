// 只要监听函数的返回值不为 null，就会忽略后面的监听函数执行，直接跳跃到callAsync等触发函数绑定的回调函数，然后执行这个被绑定的回调函数。
let queue1 = new AsyncParallelBailHook(['name']);
console.time('cost');
queue1.tap('1', function (name) {
    console.log(name, 1);
});
queue1.tap('2', function (name) {
    console.log(name, 2);
    return 'wrong'
});
queue1.tap('3', function (name) {
    console.log(name, 3);
});
queue1.callAsync('webpack', err => {
    console.timeEnd('cost');
});
// 执行结果:
/* 
webpack 1
webpack 2
cost: 4.975ms
 */

let queue2 = new AsyncParallelBailHook(['name']);
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
        return 'wrong';// 最后的回调就不会调用了
        cb();
    }, 2000);
});
queue2.tapAsync('3', function (name, cb) {
    setTimeout(() => {
        console.log(name, 3);
        cb();
    }, 3000);
});

queue2.callAsync('webpack', () => {
    console.log('over');
    console.timeEnd('cost1');
});

// 执行结果:
/* 
webpack 1
webpack 2
webpack 3
*/
let queue3 = new AsyncParallelBailHook(['name']);
console.time('cost3');
queue3.tapPromise('1', function (name, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log(name, 1);
            resolve();
        }, 1000);
    });
});

queue3.tapPromise('2', function (name, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log(name, 2);
            reject('wrong');// reject()的参数是一个不为null的参数时，最后的回调就不会再调用了
        }, 2000);
    });
});

queue3.tapPromise('3', function (name, cb) {
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

// 执行结果:
/* 
webpack 1
webpack 2
error
cost3: 2009.970ms
webpack 3
*/
