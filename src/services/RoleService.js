import http from "../utils/http-common";

const getAll = () => {
  return http.get("/role");
};

const get = id => {
  return http.get(`/role/${id}`);
};

const create = data => {
  return http.post("/role", data);
};

const update = (id, data) => {
  return http.put(`/role/${id}`, data);
};

const remove = id => {
  return http.delete(`/role/${id}`);
};

const removeAll = () => {
  return http.delete(`/role`);
};

const findByTitle = title => {
  return http.get(`/role?title=${title}`);
};

const RoleService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default RoleService;