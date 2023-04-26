import http from "../utils/http-common";

const getAll = () => {
  return http.get("/store");
};

const get = id => {
  return http.get(`/store/${id}`);
};

const getStoreByUserId = id => {
  return http.get(`/store/getStoreByUserId/${id}`);
};

const create = data => {
  return http.post("/store", data);
};

const update = (id, data) => {
  return http.put(`/store/${id}`, data);
};

const remove = id => {
  return http.delete(`/store/${id}`);
};

const removeAll = () => {
  return http.delete(`/store`);
};

const StoreService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  getStoreByUserId
};

export default StoreService;