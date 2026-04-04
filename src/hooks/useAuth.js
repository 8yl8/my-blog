import { useEffect, useState } from 'react'

export const useAuth=()=>{
    const [token,setToken]=useState(null)
   useEffect(()=>{
    const token=localStorage.getItem('token')
    if(token){
        setToken(token)
    }
   },[])
   const exit=()=>{
    if(token){
        localStorage.removeItem('token')
    }
   }
  
   return {token,exit}
}