import http from "../utils/http-common";

const register = data => {
  return http.post("/register", data);
};

const login = ( data) => {
  return http.post("/login", data);
};

const logout = () => {
    return http.post("/logout");
  }; 

const LoginService = {
 login,
 register,
 logout
};

export default LoginService;