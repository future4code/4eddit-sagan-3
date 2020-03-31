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
    // console.log("chegou!", loginData)
    try {
        const response = await axios.post(`${baseUrl}/login`, loginData)
        // console.log(response.data)
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
        // console.log(token)
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
    // console.log(createPostData)
    const newData = {
        text: createPostData.text,
        title: createPostData.title
    }
    // console.log(newData)
    try {
        const token = localStorage.getItem("token")
        console.log(token)
        await axios.post(`${baseUrl}/posts`,
            {
                headers: {
                    auth: token
                }
            },
            newData
        )

        alert("Post cadastrado com sucesso!")
    } catch (error) {
        console.error(error.message)
        alert("Não foi possível criar seu post.")
    }
} 