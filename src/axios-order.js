import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burder-database.firebaseio.com/'
});

export default instance;