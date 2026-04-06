import {register} from '../api/auth'
export const useRegister=()=>{
    const doregister=async({username,password})=>{
        try{
        const user={username,password}
       await register(user)
       return {success:true,message:'注册成功'}
        }catch(err){
            return {success:false,err}
        }
    
    }
    return {doregister}
}