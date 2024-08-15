import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import { UserContext } from '../../UserContext';
import { useContext } from 'react';
import Loader from '../Loader/Loader';
import MoviesList from '../MoviesList/MoviesList';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../api/movies';
import MovieBanner from '../MovieBanner/MovieBanner';
function Movies() {
  const {Mode} = useContext(UserContext);
  const {option,searchval} = useSelector((store)=>store.current);
  const [page,setPage] = useState(1)
  const {data,isFetching}  = useGetMoviesQuery({option,page,searchval})
  const handleScrolla = ()=>{
    if(page===1){
      setPage(1)
    }
    else{
      setPage(page - 1)
      window.scroll(0,0)
    }
  }
  const handleScrollb = ()=>{
    if(page===254){
      setPage(254)
    }
    else{
      setPage(page + 1)
      window.scroll(0,0)
    }
  }
  if(isFetching){
    return <Loader/>
  }
  return (
    <div className={'p-2 ' + (Mode ? "bg-white" : "bg-dark")}>
      <MovieBanner movie = {data?.results[0]}/>
      <MoviesList movies = {data?.results.slice(1)}/>
      <div className='d-flex justify-content-center pt-2'>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <Link className="btn btn-primary" onClick={()=>{handleScrolla()}} >Previous</Link>
            <Link className={"btn btn-primary-outline border-primary " + (Mode ? "text-dark" : "text-white")}>{data.page}</Link>
            <Link className="btn btn-primary" onClick={()=>{handleScrollb()}}>Next</Link>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Movies