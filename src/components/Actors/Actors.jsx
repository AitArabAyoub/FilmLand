import React, { useState } from 'react'
// (Mode ? "bg-white" : "bg-dark text-white")
import { Link, useParams } from 'react-router-dom'
import { useGetActorMoviesQuery, useGetActorQuery } from '../api/movies'
import { UserContext } from '../../UserContext';
import { useContext } from 'react';import Loader from '../Loader/Loader'
import MoviesList from '../MoviesList/MoviesList';
function Actors() {
  const {actorId} = useParams()
  const {Mode} = useContext(UserContext);
  const {data,isFetching} = useGetActorQuery(actorId) 
  const [page,setPage] = useState(1)
  const {data : movies , isFetching : fetch} = useGetActorMoviesQuery({actorId,page})
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  if(isFetching){
    <Loader/>
  }
  return (
    <div className={'container ' +(Mode ? "bg-white" : "bg-dark text-white")}>
      <div className="row p-3">
        <div className="col-5">
          <div className="card overflow-hidden w-75 shadow">
            <img src={`https://image.tmdb.org/t/p/w500${data?.profile_path}`} alt="" />
          </div>
        </div>
        <div className="col-7 d-flex flex-column justify-content-center">
          <h1>{data?.name}</h1>
          <h5>Born : {new Date(data?.birthday).toDateString() }</h5>
          <p>{data?.biography}</p>
          <Link to={`https://www.imdb.com/name/${data?.imdb_id}`} className='btn btn-primary mx-auto' target='_blank' style={{width : "fit-content"}} >IMDB</Link>
        </div>
      </div>
      <div className="row mt-5">
        <h2 className='text-center'>Movies</h2>
        {
          fetch ? <Loader/> : <MoviesList movies={movies?.results}/>
        }
      </div>
      <div className='d-flex justify-content-center pt-2'>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <button className="btn btn-primary" onClick={()=>{page === 1 ? setPage(1) : setPage(page - 1)}} >Previous</button>
            <button className={"btn btn-primary-outline border-primary " + (Mode ? "text-dark" : "text-white")}>{movies?.page}</button>
            <button className="btn btn-primary" onClick={()=>{setPage(page + 1)}}>Next</button>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Actors