import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { isInstanceOf, showNotification } from "../utils/common";

export interface ErrorResponse {
    statusCode: number
    message: string
};

export const defaultHeader = {
    default: 'application/json',
    multiPart: 'multipart/form-data'
};

export class HttpService {
    
    constructor(controllerName: string) {
        this.api = axios.create({
            baseURL: 'https://localhost:5001/api/v1/',
        });
        
        this.api.interceptors.response.use(this.responseHandler);
        this.api.interceptors.request.use(this.requestHandler, this.errorHandler);
        this.controllerName = controllerName;
    }

    private api: AxiosInstance;
    private controllerName: string;
    
    async get<T>(url: string): Promise<T[]> {    
        return this.api.get(url)
            .then(response => {
                return response.data as T[]
            })
            .catch(err => {
                const error = this.getAxiosErrorMessage(err);
                showNotification(`Error Fetching ${this.controllerName}`, `${error.message} -- ${error.statusCode}`, 'danger');
                return [];
            });
    }

    async getById<T>(url: string, id: number): Promise<T | null> {
        return this.api.get(`${url}/${id}`)
            .then(response => {
                return response.data as T
            })
            .catch(err => {
                const error = this.getAxiosErrorMessage(err);
                showNotification('Error Fetching By Id', `${error.message} -- ${error.statusCode}`, 'danger');
                return null
            }); 
    }

    async post<TCreate, T>(url: string, data?: TCreate, header = defaultHeader.default): Promise<T | null> {    
        return this.api
            .post(url, data, {
                headers: {
                    'Content-Type': header
                }
            })
            .then((response) => {
                return response.data as T
            })
            .catch(err => {
                const error = this.getAxiosErrorMessage(err);
                showNotification(`Error Creating ${this.controllerName}`, `${error.message} -- ${error.statusCode}`, 'danger');
                return null
            });    
    }

    async update<TUpdate, T>(url: string, item: TUpdate, id?: number): Promise<T | null> {    
        return this.api
            .put(`${url}/${id ?? ''}`, item)
            .then((response) => {
                return response.data as T
            })
            .catch(err => {
                const error = this.getAxiosErrorMessage(err);
                showNotification(`Error Updating ${this.controllerName}`, `${error.message} -- ${error.statusCode}`, 'danger');
                return null;
            });
    }

    async remove(url: string, id: number): Promise<boolean> {    
        return this.api
            .delete(`${url}/${id}`)
            .then((response) => {
                return response.data;
            })
            .catch(err => {
                const error = this.getAxiosErrorMessage(err);
                showNotification(`Error Deleting ${this.controllerName}`, `${error.message} -- ${error.statusCode}`, 'danger');
                return false;
            });
    }

    private responseHandler<T>(response): AxiosResponse<T | null> {    
        if (response.status == 200) {
            const data = response?.data;
            if (!data) throw new Error('API Error. No data!');
            if (Array.isArray(data)) {
                return {
                    data: data as T[]
                } as AxiosResponse<T>
            }
            return {
                data: data as T
            } as AxiosResponse<T>            
        }
        return {
            data: null
        } as AxiosResponse<T>   
    }
    
    private requestHandler(config: InternalAxiosRequestConfig<any>) {    
        try {
          const token = JSON.parse(localStorage.getItem('token') ?? '');
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        } catch (error) {
          config.headers.Authorization = undefined;
        }
        return config;
    }
    
    private errorHandler(error: any) {
        return Promise.reject(error);
    }

    private getAxiosErrorMessage(axiosError: AxiosError): ErrorResponse {
        if (isInstanceOf<ErrorResponse>(axiosError.response?.data, 'statusCode')) {
            return {
                statusCode: axiosError.response?.data.statusCode,
                message: axiosError.response?.data.message
            } as ErrorResponse
        }
        return {
            statusCode: 500,
            message: ''
        } as ErrorResponse
    }
}