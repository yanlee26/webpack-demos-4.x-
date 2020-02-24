> https://juejin.im/post/5abf33f16fb9a028e46ec352

hooks 概览：
![](https://user-gold-cdn.xitu.io/2018/3/31/1627c9c828c20aa1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

功能语法介绍：

钩子名称	|  执行方式  | 使用要点
---|------|--
SyncHook	            | 同步串行      |	不关心监听函数的返回值
SyncBailHook	        | 同步串行	    | 只要监听函数中有一个函数的返回值不为 null，则跳过剩下所有的逻辑
SyncWaterfallHook	    | 同步串行      |	上一个监听函数的返回值可以传给下一个监听函数
SyncLoopHook            |	同步循环    |	当监听函数被触发的时候，如果该监听函数返回true时则这个监听函数会反复执行，如果返回 undefined 则表示退出循环
AsyncParallelHook       |	异步并发    |	不关心监听函数的返回值
AsyncParallelBailHook   |	异步并发    |	只要监听函数的返回值不为 null，就会忽略后面的监听函数执行，直接跳跃到callAsync等触发函数绑定的回调函数，然后执行这个被绑定的回调函数
AsyncSeriesHook         |	异步串行	| 不关心callback()的参数
AsyncSeriesBailHook	    | 异步串行      |	callback()的参数不为null，就会直接执行callAsync等触发函数绑定的回调函数
AsyncSeriesWaterfallHook |	异步串行    |	上一个监听函数的中的callback(err, data)的第二个参数,可以作为下一个监听函数的参数