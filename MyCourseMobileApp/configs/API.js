import axios from "axios";

export const endpoints = {
    'categories': '/categories/',
    'courses': '/courses/'
}

export default axios.create({
    baseURL: "https://thanhduong.pythonanywhere.com"
})