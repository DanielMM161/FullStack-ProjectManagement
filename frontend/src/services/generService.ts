import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { BaseModel } from "./request/project";

export function getAll<T>(url: string, name: string) {
    return createAsyncThunk(
        name,
        async (thunkAPI) => {
            return api
                .get(url)
                .then((result) => {
                    return result.data as T[];
                })
                .catch((err) => {
                    console.error(`Error GetAll ${url} -> `, err);
                    return [];
                })
        }
    )
}

export function get<T>(url: string, name: string) {
    return createAsyncThunk(
        name,
        async (id: number, thunkAPI) => {
            return api
                .get(`${url}/${id}`)
                .then((result) => {
                    return result.data as T;
                })
                .catch((err) => {
                    console.error(`Error Get ${url} -> `, err);
                    return null;
                })
        }
    )
}

export function handleGet<T>(url: string, name: string, id: number) {
    return get<T>(url, name)(id);
    
}

export function post<TCreate, TReturn>(url: string, name: string) {
    return createAsyncThunk(
        name,
        async (item: TCreate, thunkAPI) => {
            return api
                .post(url, item)
                .then((result) => {                    
                    return result.data as TReturn;
                })
                .catch((err) => {
                    console.error(`Error Create ${url} -> `, err);
                    return thunkAPI.rejectWithValue({error: err})                    
                })
        }
    )
}

export function update<TUpdate extends BaseModel, TReturn>(url: string, name: string) {
    return createAsyncThunk(
        name,
        async (item: TUpdate, thunkAPI) => {
            return api
                .put(`${url}/${item.id}`, item)
                .then((result) => {
                    return result.data as TReturn;
                })
                .catch((err) => {
                    console.error(`Error Update ${url} -> `, err);
                    return null;
                })
        }
    )
}

export function remove(url: string, name: string) {
    return createAsyncThunk(
        name,
        async (id: number, thunkAPI) => {
            return api
                .delete(`${url}/${id}`)
                .then((result) => {
                    return result.data;
                })
                .catch((err) => {
                    console.error(`Error remove ${url} -> `, err);
                    return thunkAPI.rejectWithValue({error: err})    
                })
        }
    )
}