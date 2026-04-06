import {getCollect, postCollect } from "../api/auth"
import { usePermission } from "./usePermission"
export const useCollect=()=>{
   const {permission}=usePermission()
    const collect=async(user_id,target_id)=>{
        if(permission()){
            const temp={
                target_id:target_id,
                user_id:user_id
            }
            await postCollect(temp)
        }else{
            return
        }
    }
    return {collect}
}