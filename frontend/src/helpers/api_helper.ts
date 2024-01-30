import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import config from '../config';

const { api } = config;

axios.defaults.baseURL = api.API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;


// Define the authorization interceptor function
export function authorizationInterceptor(internalAxiosRequestConfig: InternalAxiosRequestConfig) {
  const token = JSON.parse(sessionStorage.getItem('authUser') || '{}').accessToken;
  if (token) {
    internalAxiosRequestConfig.headers.set('Authorization', `Bearer ${token}`);
  }

  const csrfToken = getCookie('csrftoken');
  if (csrfToken) {
    internalAxiosRequestConfig.headers.set('X-CSRFToken', csrfToken);
  }

  return internalAxiosRequestConfig;
}

// Use the interceptor with axios
axios.interceptors.request.use(
  authorizationInterceptor,
  (error: AxiosError) => Promise.reject(error)
);




function getCookie(name: string): string | null {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === `${name}=`) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

axios.interceptors.response.use(
  (response: AxiosResponse) => (response.data ? response.data : response),
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        sessionStorage.removeItem('authUser');
        window.location.href = '/login';
      }

      let message;
      switch (status) {
        case 500:
          message = 'Internal Server Error';
          break;
        case 401:
          message = 'Invalid credentials';
          break;
        case 404:
          message = 'Sorry! The data you are looking for could not be found';
          break;
        default:
          message = (data as { error?: string }).error || 'An unexpected error occurred';
      }
      return Promise.reject(message);
    }

    return Promise.reject('An unexpected error occurred');
  }
);

const setAuthorization = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

class APIClient {
  get = (url: string, params?: Record<string, any>) => {
    const queryString = params
      ? Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join('&')
      : '';
    return axios.get(queryString ? `${url}?${queryString}` : url);
  };

  create = (url: string, data: Record<string, any>) => {
    return axios.post(url, data);
  };

  update = (url: string, data: Record<string, any>) => {
    return axios.patch(url, data);
  };

  put = (url: string, data: Record<string, any>) => {
    return axios.put(url, data);
  };

  delete = (url: string, config?: AxiosRequestConfig) => {
    return axios.delete(url, config);
  };
}

const getLoggedinUser = () => {
  const user = sessionStorage.getItem('authUser');
  return user ? JSON.parse(user) : null;
};

const getToken = () => {
  const authUser = sessionStorage.getItem('authUser');
  return authUser ? JSON.parse(authUser).accessToken : null;
};

export { APIClient, setAuthorization, getLoggedinUser, getToken };
