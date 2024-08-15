import React from 'react'
import { Img1, Img2} from '../../imgs/Imgs';
import { Link, NavLink} from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { useContext } from 'react';
import { useGetGenresQuery } from '../api/movies';
import { Filmicon,Staricon,Tvicon } from '../icons/icons';
import { useDispatch } from 'react-redux';
import { SelectedList } from '../../features/currentSlice';
import icons from "../genres"
import { isAction } from '@reduxjs/toolkit';
function Aside() {
  const {Mode} = useContext(UserContext);
  const {data,isLoading} = useGetGenresQuery()
  const dispatch = useDispatch()
  if(isLoading){
    return ""
  }
  return (
    <div className={'Aside ' + (Mode ? " bg-white" : " bg-dark text-white")}>
      <div className='d-flex justify-content-center align-items-center py-3  border-bottom'>
        {Mode ? <Link to="/"> <Img1/> </Link>  : <Link to="/"> <Img2/> </Link>}
      </div>
      <div className='categories border-bottom py-1'>
        <h6 className='p-2 pb-0 text-secondary'>Categories</h6>
        <ul className="list-group">
          <li onClick={()=>{dispatch(SelectedList("popular"))}} className={"ps-3 py-2 text-decoration-none" + (Mode ? " text-dark" : " text-white")}>
            <Filmicon/>
            <span className='ms-2 fs-6'>Popular</span>
          </li>
          <li onClick={()=>{dispatch(SelectedList("top_rated"))}} className={"ps-3 py-2 text-decoration-none" + (Mode ? " text-dark" : " text-white")}>
            <Staricon/>
            <span className='ms-2 fs-6'>Top Rated</span>
          </li>
          <li onClick={()=>{dispatch(SelectedList("upcoming"))}} className={"ps-3 py-2 text-decoration-none" + (Mode ? " text-dark" : " text-white") }>
            <Tvicon/>
            <span className='ms-2 fs-6'>Upcoming</span>
          </li>
        </ul>
      </div>
      <div className='categories border-bottom py-1'>
        <h6 className='p-2 pb-0 text-secondary'>Genres</h6>
        <ul className="list-group">
          {
            data.genres.map((genre,index)=>{
              return(
                <li onClick={()=>{dispatch(SelectedList(genre.id))}} key={index} className={"ps-3 py-2 text-decoration-none " + (Mode ? " text-dark" :  "text-white")}>
                  <img src={icons[genre.name.toLowerCase()]} alt="" width={26} height={26} className={(Mode ? "" :  "invert")} />
                  <span className={'ms-2 fs-6 '}>{genre.name}</span>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default Aside