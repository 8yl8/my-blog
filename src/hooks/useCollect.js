import {getCollect,deleteCollect, postCollect } from "../api/auth"
export const useCollect=()=>{
    const token=localStorage.getItem('token')
    const username=token.split('-')[1]
    const collect=async(target_id,change)=>{
        const {data}=await getCollect()
        if(data&&username){
            const hasdata=data.find(item=>item.username===username&&item.target_id===target_id)
            if(hasdata){
                await deleteCollect(hasdata.id)
            }else{
                const temp={
                    target_id:target_id,
                    username:username,
                   id:Date.now()+'-'+username+'-'+Math.random().toString(36).substring(2,11),
                }
                await postCollect(temp)
            }
            if(change){
                const {data}=await getCollect()
                const newCount=data.filter(item=>item.target_id===target_id).length
                change(target_id,newCount)
            }
        }
        
      
    }
    const deletecollect=async(id)=>{
        const {data}=await getCollect()
        const deletecollect=data.filter(item=>item.target_id===id)
        await Promise.all(
            deletecollect.map(item=>
                deleteCollect(item.id)
            )
        )
    }
    return {collect,deletecollect}
}