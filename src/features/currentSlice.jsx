import { createSlice} from '@reduxjs/toolkit';
const initialState = {
    option : "",
    searchval : "",
};
const currentSlice = createSlice({
    name: 'currentList',
    initialState,
    reducers : {
        SelectedList : (state,action)=>{
            state.option = action.payload;
            state.searchval=""
        },
        Setsearchval : (state,action)=>{
            state.searchval = action.payload
        }
    }
});
// console.log(cartSlice);
export const  {SelectedList,Setsearchval} = currentSlice.actions
export default currentSlice.reducer;