import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { BaseModel } from "../models/baseModel";
import { isInstanceOf } from "../utils/common";

export interface ErrorResponse {
    statusCode: number
    message: string
}

class BaseService {

    api: AxiosInstance
    static instance: BaseService

    protected constructor() {
        this.api = axios.create({
            baseURL: 'https://localhost:5001/api/v1/',
        });
        this.api.interceptors.response.use(this.responseHandler);
        this.api.interceptors.request.use(this.requestHandler, this.errorHandler);
    }
    
    public static getInstance() {
        if (!BaseService.instance) {
            this.instance = new BaseService()
        }    
        return BaseService.instance;
    }

    get<T>(url: string): Promise<T[] | T | ErrorResponse> {    
        return this.api
            .get(url)
            .then((response) => {
                if (Array.isArray(response)) return response.data as T[]
                return response.data as T
            })
            .catch(err => {
                console.error("error Get --> ", err)
               return this.getAxiosErrorMessage(err)
            })
    }

    getById<T>(url: string, id: number): Promise<T | ErrorResponse> {    
        return this.api
            .get(`${url}/${id}`)
            .then((response) => {
                return response.data as T
            })
            .catch((err: AxiosError) => {
                console.error("error Get By Id--> ", err)
                return this.getAxiosErrorMessage(err)
            })
    }

    post<TCreate, T>(url: string, item?: TCreate): Promise<T | ErrorResponse> {    
        return this.api
            .post(url, item)
            .then((response) => {
                return response.data as T
            })
            .catch((err: AxiosError) => {
                console.error("error en Post --> ", err)                
                return this.getAxiosErrorMessage(err)
            })
    }

    update<TUpdate extends BaseModel, T>(url: string, item: TUpdate): Promise<T | ErrorResponse> {    
        return this.api
            .put(`${url}/${item.id}`, item)
            .then((response) => {
                return response.data as T
            })
            .catch((err: AxiosError) => {
                console.error("error Update --> ", err)
                return this.getAxiosErrorMessage(err)
            })
    }

    remove(url: string, id: number): Promise<boolean | ErrorResponse> {    
        return this.api
            .delete(`${url}/${id}`)
            .then((response) => {
                return response.data;
            })
            .catch((err: AxiosError) => {
                console.error("error Remove --> ", err)
                return this.getAxiosErrorMessage(err)
            })
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

export const baseService = BaseService.getInstance();