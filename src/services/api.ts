import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const url = axios.create({
  baseURL: `${BASE_URL}/`,
});


url.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject({ ...error });
  }
);

export default url;