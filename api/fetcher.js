import axios from "./axios";


// const fetcher = (url) => axios.get(url).then(res => res.data);
const fetcher = (url) => fetch(url).then((res) => res.json())

export default fetcher;