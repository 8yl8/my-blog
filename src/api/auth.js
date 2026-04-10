import api from './index'

//这是关于登录页面的存储，后续用后端代替
export const login=(user)=>api.post('/users/login',user)
export const getuser=(id)=>api.get(`/users/${id}`)
export const getcurrentuser=()=>api.get('/users')
export const register=(user)=>api.post('/users/register',user)
export const patchuser=(updata)=>api.patch(`/users`,updata)
export const deleteuser=()=>api.delete(`/users`)
export const patchavatar=(formData)=>api.post(`/users/avatar`,formData)
//关于文章的api接口
export const getarticles=()=>api.get('/articles')
export const postarticles=(article)=>api.post('/articles',article)
export const patcharticles=(id,update)=>api.patch(`/articles/${id}`,update)
export const deletearticles=(id)=>api.delete(`/articles/${id}`)
export const getarticle=(id)=>api.get(`/articles/${id}`)
export const gettokenarticle=(id)=>api.get(`/articles/me/${id}`)
export const postarticlecover=(formData)=>api.post('/articles/cover',formData)
export const getmyartcle=()=>api.get('/articles/my')
//关于评论的api接口
export const getcomment=(id)=>api.get(`/comments/${id}`)
export const gettokencomment=(id)=>api.get(`/comments/me/${id}`)
export const postcomment=(newcomment)=>api.post('/comments',newcomment)
export const patchcomment=(id,updata)=>api.patch(`/comments/${id}`,updata)
export const deleteComment=(id)=>api.delete(`/comments/${id}`)
//关于喜欢的api接口
export const getLike=()=>api.get('/likes')
export const postLike=(like)=>api.post('/likes',like)
export const deleteLike=(id)=>api.delete(`/likes/${id}`)
export const getUserLike=(user_id)=>api.get(`/likes/${user_id}`)
//关于收藏的api接口
export const getCollect=()=>api.get('/collects')
export const postCollect=(collect)=>api.post('/collects',collect)
export const deleteCollect=(id)=>api.delete(`/collects/${id}`)


