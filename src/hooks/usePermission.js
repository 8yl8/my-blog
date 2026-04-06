import { useAuth } from "./useAuth"
export const usePermission=()=>{
    const {token}=useAuth()
     const permission=()=>{
         if(!token){
            alert('还没登录，请先登录')
            return false
        }
        return true
    }
    return {permission}
}