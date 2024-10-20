import axios from "axios";
// || `AIzaSyA2jtrJpkxdvZv3MbjGuaQ905SYPZVa6ck`

const request = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  params: {
    key: process.env.EXPO_PUBLIC_API_KEY,
  },
});

export default request;
