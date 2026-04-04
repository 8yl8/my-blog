import styles from './Login.module.css'
import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin.js'
import { useNavigate } from 'react-router-dom'
function Login(){
    const [ username,setUsername ]=useState('')
    const [ password,setPassword ]=useState('')
    const navigate=useNavigate()
    const {login}=useLogin()
    async function submit(e){
        e.preventDefault()
        if(!username.trim()||!password.trim()){
            alert('请输入账号和密码')
            return
        }
        try{
            const res=await login({username,password})
            if(res.success){
            navigate('/')
            }else{
               throw new Error(res.msg)
            }
        }catch(err){
            alert(err.message)
        }
    }
    function register(){
        navigate('/register')
    }
    return (
        <div>
        <div className={styles.container}>
                <h2>登录</h2>
                <form onSubmit={submit}>
                <div className={styles.loginItem}>
                    <label htmlFor='username' className={styles.label}>账号</label>
                    <input type="text" className={styles.input} placeholder="请输入账号" id='username' value={username}
                    onChange={e=>{setUsername(e.target.value.trim())}}/>
                </div>
                <div className={styles.loginItem}>
                    <label htmlFor='password' className={styles.label}>密码</label>
                    <input type="password" className={styles.input} placeholder="请输入密码" id='password' value={password}
                    onChange={e=>{setPassword(e.target.value.trim())}}/>
                </div>
                <button type='submit' className={styles.btn} >登录</button>
                <button type='button' className={styles.btn} onClick={register}>注册</button>
                <button type='button' className={styles.btn} onClick={()=>{navigate('/')}}>游客登录</button>
                </form>
        </div>
        </div>
    )
}
export default Login