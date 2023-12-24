import axios from "axios";

const mainAxios = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxios = () => {
    return mainAxios
};

export default useAxios;