import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://backend-myprojectmanagement.azurewebsites.net/api/v1/',
});

export default instance;
