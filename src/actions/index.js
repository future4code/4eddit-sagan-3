import axios from 'axios'

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