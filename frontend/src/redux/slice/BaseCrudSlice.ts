import { Draft, Slice, createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { BaseModel } from "../../models/baseModel";
import { ErrorResponse, baseService } from "../../services/BaseCrudService";
import { isInstanceOf } from "../../utils/common";
import { HttpService } from "../../services/HttpService";

export interface GenericState<T extends BaseModel> {
    data: T[];
    fetching: boolean;
}

export interface ActionUrl {
    action?: string
}

export class BaseCrudSlice<T extends BaseModel, TCreate, TUpdate extends BaseModel> {

    constructor(name: string, url: string, state: GenericState<T>) {
        this.name = name;
        this.url = url;
        this.httpService = new HttpService(this.url);
        this.slice = createSlice({
            name: this.name,
            initialState: state,
            reducers: {},
            extraReducers: (build) => {
                /** pending */
                build.addCase(this.getAllAsync.pending, (state, action) => {                                
                    return { data: state.data, fetching: true }
                }),
                /** fulfilled */
                build.addCase(this.getAllAsync.fulfilled, (_, action) => { 
                    const { payload } = action;
                    if (payload) {
                        return { data: payload, fetching: false }
                    }                                
                }),
                build.addCase(this.createAsync.fulfilled, (state, action) => {                                             
                    const { payload } = action;
                    return { data: [...state.data, payload as Draft<T>], fetching: false}
                }),
                build.addCase(this.updateAsync.fulfilled, (state, action) => {                                             
                    const { payload } = action;
                    const elemnents = [...state.data];
                    const index = elemnents.findIndex((item) => item.id === payload.id);
                    if (index !== -1) {
                        elemnents[index] = payload as Draft<T>;
                    }
                    return { data: elemnents, fetching: false}
                }),
                build.addCase(this.removeAsync.fulfilled, (state, action) => {                            
                    const { payload } = action;
                    const elemnents = [...state.data];
                    const index = elemnents.findIndex((item) => item.id === payload);            
                    state.data.splice(index, 1)                    
                })
            }
        })            
    };

    slice: Slice
    name: string
    url: string
    httpService: HttpService;
            
    getAllAsync = createAsyncThunk<T[], {}>(
        'Get All',
        async (actionUrl: ActionUrl, thunkAPI) => {
            const response = await this.httpService.get<T>(`${this.url}/${actionUrl.action ?? ''}`);
            return thunkAPI.fulfillWithValue(response as T[]);
        }
    );

    getById = createAsyncThunk<T | null, number, { rejectValue: null }>(
        'Get By Id',
        async (id: number, thunkAPI) => {                      
            const response = await this.httpService.getById<T>(this.url, id);
            if (response) return thunkAPI.fulfillWithValue(response); 
            return thunkAPI.rejectWithValue(response);             
        }
    );

    createAsync = createAsyncThunk<T, TCreate, { rejectValue: null }>(
        'Create',
        async (item: TCreate, thunkAPI) => {
            const response = await this.httpService.post<TCreate, T>(this.url, item);
            if (response) return thunkAPI.fulfillWithValue(response);         
            return thunkAPI.rejectWithValue(response);   
        }
    );

    updateAsync = createAsyncThunk<T, TUpdate, { rejectValue: null }>(
        'Update',
        async (item: TUpdate, thunkAPI) => {
            const response = await this.httpService.update<TUpdate, T>(this.url, item, item.id);
            if (response) return thunkAPI.fulfillWithValue(response);
            return thunkAPI.rejectWithValue(response);               
        }
    );

    removeAsync = createAsyncThunk<number, number, { rejectValue: null }>(
        'Remove',
        async (id: number, thunkAPI) => {
            const response = await this.httpService.remove(this.url, id);
            if (response) return thunkAPI.fulfillWithValue(id);
            return thunkAPI.rejectWithValue(null);                            
        }
    );
}