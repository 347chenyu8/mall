//防抖动函数,异步操作都会在同步操作结束之后执行，event loop
export function debounce(func,delay){
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}
