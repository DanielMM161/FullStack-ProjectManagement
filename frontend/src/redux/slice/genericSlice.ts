import { ActionReducerMapBuilder, AsyncThunk, PayloadAction, SliceCaseReducers, ValidateSliceCaseReducers, createSlice } from "@reduxjs/toolkit"



export interface GenericState {

}

export interface GenericCallExtraReducers {
    getAll: AsyncThunk<any[] | never[], void, {}>
}

export const genericSlice = <T, Reducers extends SliceCaseReducers<T>>({    
    name = '',
    initialState,
    reducers,
    extraReducers,
    genericCalls
} : {    
    name: string,
    initialState: T,
    reducers: ValidateSliceCaseReducers<T, Reducers>,
    extraReducers?: (builder: ActionReducerMapBuilder<GenericState>) => void,
    genericCalls: GenericCallExtraReducers
}) => {
    
    return {
        slice: createSlice({
            name,
            initialState,
            reducers: {
                ...reducers
            },
            extraReducers: build => {
                build.addCase(genericCalls.getAll.fulfilled, (state, action) => {                    
                    state['data'] = action.payload
                }),
                extraReducers
            }
        }),
        genericCalls: genericCalls
    }
}