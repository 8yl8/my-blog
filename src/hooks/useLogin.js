import { useContext } from 'react'
import { login,me } from '../api/auth'
import UserContext from '../context/UserContext'
export const useLogin=()=>{
    const {setUserId}=useContext(UserContext)
    const dologin=async ({username,password})=>{
        try{
        const user={username,password}
        const res=await login(user)
        const userId=await me()
        setUserId(userId.data.id)
        localStorage.setItem('token',res.data.token)
        return {success:true,msg:'登录成功'}
    }catch(error){
        return {success:false,error}
    }
    }
    return {dologin}
}