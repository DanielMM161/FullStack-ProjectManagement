import { ActionReducerMapBuilder, AsyncThunk, PayloadAction, SliceCaseReducers, ValidateSliceCaseReducers, createSlice } from "@reduxjs/toolkit"

export interface GenericState<T> {
    data: T[];
}

export interface GenericCallExtraReducers {
    getAll: AsyncThunk<any[] | never[], void, {}>
}

export const genericSlice = <T, State extends GenericState<T>, Reducers extends SliceCaseReducers<State>>({    
    name = '',
    initialState,
    reducers,
    extraReducers,
    genericCalls
} : {    
    name: string,
    initialState: State,
    reducers: ValidateSliceCaseReducers<State, Reducers>,
    extraReducers?: (builder: ActionReducerMapBuilder<State>) => void,
    genericCalls: GenericCallExtraReducers
}) => {
    
    return createSlice({
        name,
        initialState,
        reducers: {
            ...reducers
        },
        extraReducers: build => {
            build.addCase(genericCalls.getAll.fulfilled, (state, action) => {                    
                state.data = action.payload
            }),
            extraReducers
        }
    })
}