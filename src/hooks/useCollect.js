import { postCollect } from "../api/auth"
import { usePermission } from "./usePermission"
export const useCollect=()=>{
   const {permission}=usePermission()
    const collect=async(target_id)=>{
        if(permission()){
            const temp={
                target_id:target_id,

            }
            await postCollect(temp)
        }else{
            return
        }
    }
    return {collect}
}