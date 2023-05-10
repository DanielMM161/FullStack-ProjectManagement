import { GenericState, genericSlice } from "./genericSlice";

export const testSlice = genericSlice({
    name: 'test', 
    initialState: {data: '', status: 'loading' } as GenericState<string>,
    reducers: {
       hello(state) {
        state.status = 'success',
        state.data = 'hello'
       }
    }
})

export const { hello } = testSlice.actions