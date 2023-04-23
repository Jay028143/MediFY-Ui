import http from "../utils/http-common";

const getAll = () => {
  return http.get("/medicine");
};

const get = id => {
  return http.get(`/medicine/${id}`);
};

const create = data => {
  return http.post("/medicine", data);
};

const update = (id, data) => {
  return http.put(`/medicine/${id}`, data);
};

const remove = id => {
  return http.delete(`/medicine/${id}`);
};

const removeAll = () => {
  return http.delete(`/medicine`);
};


const MedicineService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};

export default MedicineService;