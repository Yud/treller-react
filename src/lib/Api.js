import axios from 'axios';

function UsersApi() {
  const create = payload => axios.post('/api/v1/signup', payload);

  return {
    create
  };
}

function SessionApi() {
  const login = payload => axios.post('/api/v1/login', payload);

  return {
    login
  };
}

const API = {
  SessionApi: SessionApi(),
  UsersApi: UsersApi()
};

export default API;
