import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route,RouterProvider,createBrowserRouter,createRoutesFromElements } from 'react-router-dom';
import {Movies,MovieDetails,Actors,Profile} from "./components"
import { store } from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Movies/>}/>
      <Route path='Movie' element={<MovieDetails/>}>
        <Route path=':movieId' element={<MovieDetails/>}/>
      </Route>
      <Route path='Actors' element={<Actors/>}>
        <Route path=':actorId' element={<Actors/>}/>
      </Route>
      <Route path='profile' element={<Profile/>}/>
    </Route>
  ),
)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router = {router}/>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
