import {postuser} from '../api/auth'
import {getuser} from '../api/auth'
export const useRegister=()=>{
    const register=async({username,password})=>{
        try{
        const {data} =await getuser()
       const t=data.find(item=>item.username===username)
       if(!t){
        const user={
        id:Date.now()+'-'+username+'-'+Math.random().toString(36).substring(2,11),
        nickname:'用户',
        password:password,
        username:username,
        userIntro: "暂无简介",
        fans: 0,
        like: 0,
      }
     const {data}=await postuser(user)
     return {success:true,msg:'注册成功',data}
       }else{
        throw new Error('注册失败，用户名已存在')
       }
        }catch(err){
            return {success:false,msg:'注册失败，用户名已存在'}
        }
  
    }
    return {register}
}