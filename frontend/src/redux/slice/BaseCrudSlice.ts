import { Draft, Slice, createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { BaseModel } from "../../models/baseModel";
import { baseService } from "../../services/BaseCrudService";

export interface GenericState<T extends BaseModel> {
    data: T[];
    fetching: boolean;
}

export interface ActionUrl {
    action?: string
}

export class BaseCrudSlice<T extends BaseModel, TCreate, TUpdate extends BaseModel> {

    constructor(name: string, url: string, state: GenericState<T>) {
        this.name = name
        this.url = url        
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
                    return { data: action.payload, fetching: false }
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
        
    getAllAsync = createAsyncThunk(
        'Get All',
        async (actionUrl: ActionUrl, thunkAPI) => {                      
            const response = await baseService.get<T>(`${this.url}/${actionUrl.action ?? ''}`);
            if (response == null) return thunkAPI.rejectWithValue('');
            return response as T[];
        }
    );

    getById = createAsyncThunk(
        'Get By Id',
        async (id: number, thunkAPI) => {                      
            const response = await baseService.getById<T>(this.url,id);
            if (response == null) return thunkAPI.rejectWithValue('');
            return response as T;
        }
    );

    createAsync = createAsyncThunk(
        'Create',
        async (item: TCreate, thunkAPI) => {
            const response = await baseService.post<TCreate, T>(this.url, item);
            if (response == null) return thunkAPI.rejectWithValue(null);
            return response as T;
        }
    );

    updateAsync = createAsyncThunk(
        'Update',
        async (item: TUpdate, thunkAPI) => {
            const response = await baseService.update<TUpdate, T>(this.url, item);
            if(response == null) return thunkAPI.rejectWithValue(null);
            return response as T;
        }
    );

    removeAsync = createAsyncThunk(
        'Remove',
        async (id: number, thunkAPI) => {
            const response = await baseService.remove(this.url, id);
            if(!response) return thunkAPI.rejectWithValue(false)
            return id;    
        }
    );
}