import React from 'react'
import Movie from '../Movie/Movie'
import { UserContext } from '../../UserContext';
import { useContext } from 'react';
function MoviesList({movies}) {
    const {Mode} = useContext(UserContext);
    return (
        <div className='container'>
            <div className="row">
                {
                    movies.map((movie,index)=>{
                        return <Movie movie = {movie} key={index}/>
                    })
                }
            </div>  
        </div>
    )
}

export default MoviesList
// {Mode ? "text-white"}