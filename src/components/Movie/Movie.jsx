import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import { UserContext } from '../../UserContext';
import { useContext } from 'react';
function Movie({movie,index}) {
    const {Mode} = useContext(UserContext);
    if(movie.poster_path){
        return (
            <div className='col-3 p-2 d-flex align-items-stretch' key={index}>
                <Link to={`/Movie/${movie.id}`} className='text-decoration-none d-flex align-items-stretch w-100'>
                    <div className="card overflow-hidden  border-0 w-100 h-100">
                        <div className={"p-0 h-100 w-100 " + (Mode ? "bg-white" : "bg-dark")}>
                            <img src={"https://image.tmdb.org/t/p/w500"+ movie.poster_path} alt="" className='card-img-top w-100'/>
                        </div>
                        <div className={"text-center " + (Mode ? "bg-white" : "bg-dark text-white")}>
                            <h5 className='text'>{movie.title}</h5>
                            <div>
                                <Rating initialValue={movie.vote_average / 2} readonly size={24}/>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default Movie