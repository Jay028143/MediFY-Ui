import http from "../utils/http-common";

const getAll = () => {
  return http.get("/order");
};

const get = id => {
  return http.get(`/order/${id}`);
};

const getByStoreId = id => {
  return http.get(`/order/getOrdersByStoreId/${id}`);
};

const create = data => {
  return http.post("/order", data);
};

const update = (id, data) => {
  return http.put(`/order/${id}`, data);
};

const remove = id => {
  return http.delete(`/order/${id}`);
};

const removeAll = () => {
  return http.delete(`/order`);
};


const OrderService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  getByStoreId
};

export default OrderService;