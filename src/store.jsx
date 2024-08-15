import { configureStore } from '@reduxjs/toolkit';
import { moviesSlice } from './components/api/movies';
import currentReducer from "../src/features/currentSlice"
import userReducer from '../src/features/userSlice'
export const store = configureStore({
    reducer: {
        [moviesSlice.reducerPath] : moviesSlice.reducer,
        current : currentReducer,
        user : userReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(moviesSlice.middleware)

});
