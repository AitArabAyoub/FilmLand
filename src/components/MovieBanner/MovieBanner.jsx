import React from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../UserContext';
import { useContext } from 'react';
function MovieBanner({movie}) {
    const {Mode} = useContext(UserContext);
    return (
        <div className='col-12 p-2 d-flex align-items-stretch' >
            <Link to={`/Movie/${movie.id}`} className='text-decoration-none d-flex align-items-stretch w-100'>
                <div class="card text-bg-dark w-100 position-relative">
                    <div className='overlay'></div>
                    <img src={"https://image.tmdb.org/t/p/original/"+ movie.backdrop_path} alt="" className='card-img-top w-100 gray' style={{height:"450px",objectFit : "cover"}}/>
                    <div class="card-img-overlay d-flex flex-column justify-content-end">
                        <h5 class="card-title">{movie.title}</h5>
                        <p class="card-text">{movie.overview}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}
export default MovieBanner