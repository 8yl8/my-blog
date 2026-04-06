import { login } from '../api/auth'
export const useLogin=()=>{
    const dologin=async ({username,password})=>{
        try{
        const user={username,password}
        const res=await login(user)
        localStorage.setItem('token',res.data.token)
        return {success:true,msg:'登录成功'}
    }catch(error){
        return {success:false,error}
    }
    }
    return {dologin}
}