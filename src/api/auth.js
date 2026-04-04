import api from './index'

//这是关于登录页面的存储，后续用后端代替
export const getuser=()=>api.get('/users')
export const postuser=(user)=>api.post('/users',user)
export const patchuser=(user,updata)=>api.patch(`/users/${user.id}`,updata)
export const getarticles=()=>api.get('/articles')
export const postarticles=(article)=>api.post('/articles',article)
export const patcharticles=(id,update)=>api.patch(`/articles/${id}`,update)
export const deletearticles=(id)=>api.delete(`/articles/${id}`)
export const getcomment=()=>api.get('/comments')
export const postcomment=(newcomment)=>api.post('/comments',newcomment)
export const patchcomment=(id,updata)=>api.patch(`/comments/${id}`,updata)
export const deleteComment=(id)=>api.delete(`/comments/${id}`)
export const getLike=()=>api.get('/like')
export const postLike=(like)=>api.post('/like',like)
export const deleteLike=(id)=>api.delete(`like/${id}`)
export const getCollect=()=>api.get('/collect')
export const postCollect=(collect)=>api.post('/collect',collect)
export const deleteCollect=(id)=>api.delete(`collect/${id}`)

