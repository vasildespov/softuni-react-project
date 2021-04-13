import axios from "axios";
export const login = async (user) => {
  return await axios
    .post("/api/users/login", user)
    .then((res) => res)
    .catch((err) => err.response);
};
export const register = async (user) => {
  return await axios
    .post("/api/users/register", user)
    .then((res)=> res)
    .catch(err=>err.response)
}