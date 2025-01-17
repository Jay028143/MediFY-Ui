import http from "../utils/http-common";

const getAll = () => {
  return http.get("/customer");
};

const get = id => {
  return http.get(`/customer/${id}`);
};

const getCustomerByDateOfBirth = dob => {
  const defaultStoreId = localStorage.getItem('defaultStoreId');
  return http.get(`/customer/getCustomerByDateOfBirth/${defaultStoreId}/${dob}`);
};

const getByStoreId = id => {
  return http.get(`/customer/getCustomerByStoreId/${id}`);
};

const create = data => {
  return http.post("/customer", data);
};

const update = (id, data) => {
  return http.put(`/customer/${id}`, data);
};

const remove = id => {
  return http.delete(`/customer/${id}`);
};

const removeAll = () => {
  return http.delete(`/customer`);
};


const CustomerService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  getByStoreId,
  getCustomerByDateOfBirth
};

export default CustomerService;