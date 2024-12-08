import { fetchDataFromAPI, postDataToAPI } from '../api';

export const fetchRoles = async () => {
  const response = await fetchDataFromAPI('/user/role/');
  return response.data;
};

export const fetchPermissions = async () => {
  const response = await fetchDataFromAPI('/user/permission/');
  return response.data;
};
