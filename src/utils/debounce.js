export const debounce=(fn,delay,option={immediate:false,trailing:false,maxTime:null})=>{
    let timer=null
    let lastTime=Date.now()
    const {immediate,trailing,maxTime}=option
    const c=(lastThis,lastArgs)=>{
        clearTimeout(timer)
        timer=setTimeout(()=>{
            if(trailing){
            fn.apply(lastThis,lastArgs)
            lastTime=Date.now()
            }
            lastThis=null
            lastArgs=null
            timer=null
        },delay)
    }
    const temp= function(...args){
        const lastThis=this
        const lastArgs=args
        let now=Date.now()
        const hasimmediate=!timer&&immediate
        clearTimeout(timer)
        timer=setTimeout(()=>{
            timer=null
        },delay)
        if(maxTime&&now-lastTime>maxTime){
            fn.apply(this,args)
            lastTime=Date.now()
            c(lastThis,lastArgs)
            return
        }
        if(hasimmediate){
               fn.apply(this,args)
        } 
        if(trailing){
            c(lastThis,lastArgs)
        }
        
    }
    temp.cancel=()=>{
        clearTimeout(timer)
        timer=null
    }
    return temp
}