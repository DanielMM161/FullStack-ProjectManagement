import axios, { AxiosResponse } from 'axios';
import HttpError from './HttpError';

const http = axios.create({
  baseURL: 'https://backend-myprojectmanagement.azurewebsites.net/api/v1/',
});

function responseHandler(response: AxiosResponse<any>): any {
  if (response.status == 200) {
    const data = response?.data;
    if (!data) throw new HttpError('API Error. No data!');
    return response;
  }
  throw new HttpError('API Error! Invalid status code!');
}

http.interceptors.request.use(
  function (config) {
    try {
      const token = JSON.parse(localStorage.getItem('token') ?? '');
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } catch (error) {
      config.headers.Authorization = undefined;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(responseHandler);

export default http;
