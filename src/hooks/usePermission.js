import { useNavigate } from "react-router-dom"
import { useAuth } from "./useAuth"
export const usePermission=()=>{
    const navigate=useNavigate()
    const {token}=useAuth()
     const permission=()=>{
         if(!token){
            alert('还没登录，请先登录')
            return false
        }
        return true
    }
     
     const checkPermission=()=>{
        const t=permission()
        if(!t){
            navigate('/login')
            return false
        }
        return true
    }
    return {checkPermission}
}