import axios from "axios";

const instance = axios.create({

    baseURL :"https://burgerapp-react88.firebaseio.com/"
});

export default instance;