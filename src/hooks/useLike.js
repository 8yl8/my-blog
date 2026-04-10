import { postLike } from "../api/auth";
import { usePermission } from "./usePermission";
export const useLike=()=>{
  const {permission}=usePermission()
    const post=async(target_id,like_target)=>{
        try{
          if(permission()){
             const like={
            target_id:target_id,
            like_target:like_target
        }
        const response=await postLike(like)
        return response
    }else {
       return
    }   
    }catch(err){
       console.log(err);
        }    
    }
    
   
    return {post}
}