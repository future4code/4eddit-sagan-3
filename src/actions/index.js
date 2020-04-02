import axios from 'axios'
import { routes } from '../containers/Router'
import { push } from "connected-react-router";

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/fourEddit"


export const signup = (registerData) => async (dispatch) => {
    // console.log("chegou!", registerData)
    const newData = {
        email: registerData.email,
        password: registerData.password,
        username: registerData.username
    }
    // console.log(newData)
    try {
        await axios.post(`${baseUrl}/signup`, newData)
        alert('Cadastro efetuado com sucesso!')
    } catch (error) {
        console.error(error.message)
        alert("Não foi possível efetuar cadastro.")
    }
}

export const login = (loginData) => async (dispatch) => {
    try {
        const response = await axios.post(`${baseUrl}/login`, loginData)
        const token = response.data.token
        const user = response.data.user
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        dispatch(push(routes.feed))
    } catch (error) {
        console.error(error.message)
        alert("Não foi possível efetuar o login.")
    }
}


const setPosts = (posts) => ({
    type: 'SET_POSTS',
    payload: {
        posts
    }
})

export const getPosts = () => async (dispatch) => {

    try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${baseUrl}/posts`, {
            headers: {
                auth: token
            }
        })
        dispatch(setPosts(response.data.posts))
    } catch (error) {
        console.error(error.message)
        alert("Não foi possível acessar a lista de posts.")
    }

}

export const createPost = (createPostData) => async (dispatch) => {
    const newData = {
        text: createPostData.text,
        title: createPostData.title
    }
    try {
        const token = localStorage.getItem("token")
        await axios.post(`${baseUrl}/posts`,
            newData,
            {
                headers: {
                    auth: token
                }
            }
        )
        // alert("Post cadastrado com sucesso!")
        dispatch(getPosts())
    } catch (error) {
        console.error(error.message)
        alert("Não foi possível criar seu post.")
    }
}

export const vote = (id, direction) => async (dispatch, getState) => {
    const token = localStorage.getItem("token")

    try {
        await axios.put(`${baseUrl}/posts/${id}/vote`,
            { direction: direction },
            {
                headers: {
                    auth: token
                }
            }
        )
        dispatch(getPosts())
        // const state = getState();
        // if(state.posts.postId){
        //     dispatch(getPostsDetail(state.posts.postId))
        // }

    } catch (error) {
        console.error(error.message)
        alert("Não foi possível votar no post.")
    }
}


export const voteInDetail = (id, direction) => async (dispatch, getState) => {
    const token = localStorage.getItem("token")

    try {
        await axios.put(`${baseUrl}/posts/${id}/vote`,
            { direction: direction },
            {
                headers: {
                    auth: token
                }
            }
        )

        dispatch(getPostsDetail(id))


    } catch (error) {
        console.error(error.message)
        alert("Não foi possível votar no post.")
    }
}



const setPostDetail = (post) => ({
    type: 'SET_POST_DETAIL',
    payload: {
        post
    }
})

const setPostId = (id) => ({
    type: 'SET_POST_ID',
    payload: {
        id
    }
})

export const getPostId = (postId) => async (dispatch) => {
    dispatch(setPostId(postId))
}


export const getPostsDetail = (postId) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${baseUrl}/posts/${postId}`, {
            headers: {
                auth: token
            }
        })
        dispatch(setPostDetail(response.data.post))
        dispatch(push(routes.detail))
    } catch (error) {
        console.error(error.message)
        alert("Não foi possível acessar os detalhes do post.")
    }
}


export const createComment = (createCommentData, postId) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token")
        await axios.post(`${baseUrl}/posts/${postId}/comment`,
            { text: createCommentData },
            {
                headers: {
                    auth: token
                }
            }
        )
        dispatch(getPostsDetail(postId))

    } catch (error) {
        console.error(error.message)
        alert("Não foi possível criar seu comentário.")
    }
}

export const voteComment = (postId, commentId, direction) => async (dispatch) => {
    const token = localStorage.getItem("token")

    try {
        await axios.put(`${baseUrl}/posts/${postId}/comment/${commentId}/vote`,
            { direction: direction },
            {
                headers: {
                    auth: token
                }
            }
        )
        dispatch(getPostsDetail(postId))
    } catch (error) {
        console.error(error.message)
        alert("Não foi possível votar no comentário.")
    }
}