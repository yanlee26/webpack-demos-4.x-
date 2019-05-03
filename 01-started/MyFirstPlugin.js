class MyFirstPlugin{
  apply(compiler){
    console.log(111,compiler)
    compiler.hooks.done.tapAsync('MyFirstPlugin',(stats,cb)=>{
      console.log(stats)
      cb()
    })
  }
}
module.exports = MyFirstPlugin