import styles from './Register.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useRegister } from '../../hooks/useRegister.js'
function Register(){ 
    const navigate=useNavigate()
     const [username,setUsername]=useState('')
     const [password,setPassword]=useState('')
    const [rePassword,setrePassword]=useState('')
    const {doregister}=useRegister()
    function Return(){
        navigate('/login')
    }
    async function post(e){
        e.preventDefault()
       if(!username||!password||!rePassword){
        alert('请输入用户名和密码')
        return
       }else if(password!==rePassword){
        alert('两次密码不对')
        return
       }
            const res=await doregister({username,password})
            if(res.success){
                alert(res.message)
                navigate('/login')
                return
            }
            alert(res.err.response?.data?.message||'注册失败')
    }
    return (
        <div className={styles.container}>
            <h2>注册</h2>
            <form className={styles.register} onSubmit={post}>
                <div>
                    <label htmlFor="username">用户名</label>
                    <input type="text" placeholder='请输入用户名' id='username' value={username}
                    onChange={e=>{setUsername(e.target.value.trim())}}/>
                </div>
                <div>
                    <label htmlFor="password">密码</label>
                    <input type="password" placeholder='请输入密码' id='password' value={password}
                    onChange={e=>{setPassword(e.target.value.trim())}}/>
                </div>
                <div>
                    <label htmlFor="rePassword">确认密码</label>
                    <input type="password" placeholder='确认密码' id='rePassword' value={rePassword}
                    onChange={e=>{setrePassword(e.target.value.trim())}}/>
                </div>
                <button type='submit'>注册</button>
                <button type='button' onClick={Return}>返回</button>
            </form>
        </div>
    )
}

export default Register