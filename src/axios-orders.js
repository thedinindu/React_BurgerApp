import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-burgerapp-95598.firebaseio.com/'
})

export default instance  