import axios from 'axios';

const usersApi = axios.create({
  baseURL: 'http://localhost:8000',
});

export const getUsers = async () => {
  const res = await usersApi.get('/users');
  return res.data;
};

export const addUser = async (user) => {
  return await usersApi.post('/users', user);
};
export const deleteUser = async (user) => {
  return await usersApi.delete(`/users/${user.id}`, user.id);
};
export const updateUser = async (user) => {
  return await usersApi.patch(`/users/${user.id}`, user);
};
export default usersApi;
