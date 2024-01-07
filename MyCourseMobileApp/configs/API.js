import axios from "axios";

const HOST = 'https://thanhduong.pythonanywhere.com'

export const endpoints = {
    'categories': '/categories/',
    'courses': '/courses/'
}

export const authApi = () => {
    return axios.create({
        baseURL: HOST,
        headers: {
            'Authorization': `Bearer ...`
        }
    })
}

export default axios.create({
    baseURL: HOST
})