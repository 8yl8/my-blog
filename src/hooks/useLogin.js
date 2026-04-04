import { getuser } from '../api/auth'
import { useState } from 'react'
export const useLogin=()=>{
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    const login=async ({username,password})=>{
        try{
        const { data }=await getuser()
           if(data.find(item=>item.username===username&&item.password===password)){
        const token=Date.now()+(1000*60*60*24)+'-'+username+'-'+Math.random().toString(36).substring(2,11)
        localStorage.setItem('token',token)
        return {success:true,msg:'登录成功',token}
    }else{
        throw new Error('登录失败，密码账号错误')
    }
    }catch(error){
         setError(error.message)
        return {success:false,msg:'登录失败，密码账号错误',token:null}
    }finally{
        setLoading(false)
    }
    }
    return { login,loading,error}
}