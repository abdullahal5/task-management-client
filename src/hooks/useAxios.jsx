import axios from "axios";

const mainAxios = axios.create({
  baseURL: "https://task-management-server-teal-sigma.vercel.app",
});

const useAxios = () => {
    return mainAxios
};

export default useAxios;