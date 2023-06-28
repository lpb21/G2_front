import axios from "axios"

export const instanceAxios = axios.create({
    baseURL: `${process.env.REACT_APP_ENDPOINT}/`
});

