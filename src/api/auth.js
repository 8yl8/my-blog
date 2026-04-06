import api from './index'

//这是关于登录页面的存储，后续用后端代替
export const me=()=>api.get('/me')
export const login=(user)=>api.post('/login',user)
export const getuser=(id)=>api.get(`/users/${id}`)
export const register=(user)=>api.post('/register',user)
export const patchuser=(id,updata)=>api.patch(`/users/${id}`,updata)
export const deleteuser=(id)=>api.delete(`/users/${id}`)
//关于文章的api接口
export const getarticles=()=>api.get('/articles')
export const postarticles=(article)=>api.post('/articles',article)
export const patcharticles=(id,update)=>api.patch(`/articles/${id}`,update)
export const deletearticles=(id)=>api.delete(`/articles/${id}`)
export const getarticle=(id)=>api.get(`articles/${id}`)
//关于评论的api接口
export const getcomment=(id)=>api.get(`/commnets/${id}`)
export const postcomment=(newcomment)=>api.post('/comments',newcomment)
export const patchcomment=(id,updata)=>api.patch(`/comments/${id}`,updata)
export const deleteComment=(id)=>api.delete(`/comments/${id}`)
//关于喜欢的api接口
export const getLike=()=>api.get('/likes')
export const postLike=(like)=>api.post('/likes',like)
export const deleteLike=(id)=>api.delete(`/likes/${id}`)
export const getUserLike=(user_id)=>api.get(`/likes/${user_id}`)
//关于收藏的api接口
export const getCollect=(user_id)=>api.get(`/collects/${user_id}`)
export const postCollect=(collect)=>api.post('/collect',collect)
export const deleteCollect=(id)=>api.delete(`/collect/${id}`)


