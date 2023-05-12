import http from "../utils/http-common";

const getAll = () => {
  return http.get("/user");
};

const get = id => {
  return http.get(`/user/${id}`);
};

const getByStoreId = id => {
  return http.get(`/user/getUserByStoreId/${id}`);
};

const create = data => {
  return http.post("/user", data);
};


const updatePassword = data => {
  return http.post("/user/updatePassword", data);
};

const update = (id, data) => {
  return http.put(`/user/${id}`, data);
};

const remove = id => {
  return http.delete(`/user/${id}`);
};

const removeAll = () => {
  return http.delete(`/user`);
};

const UserService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  getByStoreId,
  updatePassword
};

export default UserService;