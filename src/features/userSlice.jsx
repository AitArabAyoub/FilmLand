import { createSlice} from '@reduxjs/toolkit';
const initialState = {
    isAuthenticated : false,
    user : {},
};
const userSlice = createSlice({
    name: 'currentList',
    initialState,
    reducers : {
        setUser : (state,action)=>{
            state.user = action.payload
            state.isAuthenticated = true
        }
    }
});
// console.log(cartSlice);
export const  {SetUser} = userSlice.actions
export default userSlice.reducer;