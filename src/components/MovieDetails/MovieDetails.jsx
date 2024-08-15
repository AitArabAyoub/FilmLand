import React from 'react'
import { useParams,Link } from 'react-router-dom'
import { useGetMovieDetailsQuery,useGetRecommandationsQuery } from '../api/movies'
import Loader from '../Loader/Loader'
import icons from "../genres"
import { Rating } from 'react-simple-star-rating'
import { UserContext } from '../../UserContext';
import { useContext } from 'react';
import MoviesList from '../MoviesList/MoviesList'
function MovieDetails() {
  const {movieId} = useParams()
  const {Mode} = useContext(UserContext);
  const {data,isFetching} = useGetMovieDetailsQuery(movieId)
  const {data:recoms,isFetching:fetch} = useGetRecommandationsQuery(movieId)
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  if(isFetching){
    return <Loader/>
  }
  return (
    <div className='container'>
      <div className={"row pt-3 px-3 " + (Mode ? "bg-white" : "bg-dark text-white")}>
        <div className="col-4">
        <div class="card overflow-hidden shadow" style={{width: "16rem"}}>
          <img src={"https://image.tmdb.org/t/p/w500"+ data?.poster_path}  alt="..."/>
        </div>
        </div>
        <div className="col-8">
          <h1 className='text-center'>{data?.title}({data?.release_date.split("-")[0]})</h1>
          <h5 className='text-center'>{data?.tagline}</h5>
          <div className='d-flex justify-content-evenly'>
            <div className='d-flex'>
              <Rating initialValue={data?.vote_average / 2} readonly size={24}/>
              <p className='mt-1 ms-1'>{data?.vote_average}/10</p>
            </div>
            <p className='mt-1'>{data?.runtime}min/{months[new Date(data?.release_date).getMonth()]} {data?.release_date.split("-")[2]} {data?.release_date.split("-")[0]}/{data?.spoken_languages[0]?.name}</p>
          </div>
          <div className='d-flex justify-content-evenly'>
            {
              data?.genres.map((genre)=>{
                return <div><img src={icons[genre.name.toLowerCase()]} width={26} height={26} alt="" className={(Mode ? "" :  "invert")} /> <span className='ms-1'>{genre.name}</span></div>
              })
            }
          </div>
          <div className='mt-2'>
            <h5>Overview</h5>
            <p>{data?.overview}</p>
          </div>
          <div>
            <h5>Top Cast</h5>
            <div className='row'>
              {
                data?.credits.cast.slice(0,6).map((cast,i)=>{
                  return(                    
                    <div className="col-2 p-1" key={i}>
                      <Link to={`/Actors/${cast.id}`} className='text-decoration-none'>
                        <div className={"card overflow-hidden border-0 " + (Mode ? "bg-white" : "bg-dark text-white")}>
                          <img src={cast.profile_path ? `https://image.tmdb.org/t/p/w500${cast.profile_path}` : "http://www.fillmurray.com.com/640x360"} className='h-100'/>
                          <h6 className='text-wrap'>{cast.original_name}</h6>
                          <h6 className='text-secondary text-wrap'>{cast.character.split("/")[0]}</h6>
                        </div>
                      </Link>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className='text-center'>
              <Link to={data?.homepage} className='btn btn-primary-outline border-primary text-primary' target='t_blank'>
                WEBSITE
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-globe ms-1 mb-1" viewBox="0 0 16 16">
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/>
                </svg>
              </Link>
              <Link to={`https://imdb.com/title/${data?.imdb_id}`} className='btn btn-primary-outline border-primary text-primary' target='t_blank'>
                IMDB
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-film ms-1 mb-1" viewBox="0 0 16 16">
                  <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z"/>
                </svg>
              </Link>
              <button onClick={()=>{}} className='btn btn-primary-outline border-primary text-primary' target='_blank' data-bs-toggle="modal" data-bs-target="#exampleModal">
                TRAILER
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-tv ms-1 mb-1" viewBox="0 0 16 16">
                  <path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5M13.991 3l.024.001a1.5 1.5 0 0 1 .538.143.76.76 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.5 1.5 0 0 1-.143.538.76.76 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.5 1.5 0 0 1-.538-.143.76.76 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.5 1.5 0 0 1 .143-.538.76.76 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2"/>
                </svg>
              </button>
          </div>
        </div>
      </div>
      <div className={"row pt-5 " + (Mode ? "bg-white" : "bg-dark text-white")}>
        <h2 className='text-center'>You Might Also Like</h2>
        {fetch ? <Loader/> : <MoviesList movies={recoms?.results}/> }
      </div>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" style={{height : "300px",width : "700px"}}>
          <div class="modal-content h-100">
              <iframe  src={`https://www.youtube.com/embed/${data?.videos?.results[0]?.key}`} className='h-100'></iframe> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails