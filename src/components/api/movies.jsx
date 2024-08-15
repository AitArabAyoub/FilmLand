import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const TOKEN = "6d27a62dd65d3cb1591155a255d35a2d"
export const moviesSlice = createApi({
    // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'movies',
    // All of our requests will have URLs starting with '/fakeApi'
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://api.themoviedb.org/3'
    }),
    // tagTypes : ["Users"],
    // The "endpoints" represent operations and requests for this server
    endpoints: builder => ({
      // The `getPosts` endpoint is a "query" operation that returns data
        getMovies : builder.query({
            query : ({option,page,searchval})=> {
                if(searchval){
                    return `/search/movie?query=${searchval}&page=1&api_key=${TOKEN}`
                }
                if(option && typeof option ==="string"){
                    return `/movie/${option}?api_key=${TOKEN}&page=${page}`
                }
                if(option && typeof option ==="number"){
                    return `/discover/movie?api_key=${TOKEN}&with_genres=${option}&page=${page}`
                }
                else{
                    return `/movie/popular?api_key=${TOKEN}&page=${page}`
                }
            }
        }),
        getGenres: builder.query({
            // The URL for the request is '/fakeApi/posts'
            query: () => `/genre/movie/list?api_key=${TOKEN}`,
            // providesTags : ['Users']
        }),
        getMovieDetails : builder.query({
            query : (id)=> `/movie/${id}?api_key=${TOKEN}&append_to_response=videos,credits`
        }),
        getRecommandations : builder.query({
            query : (id) => `/movie/${id}/recommendations?api_key=${TOKEN}`
        }),
        getActor : builder.query({
            query : (id) => `/person/${id}?api_key=${TOKEN}`
        }),
        getActorMovies : builder.query({
            query : ({actorId,page}) => `/discover/movie?with_cast=${actorId}&page=${page}&api_key=${TOKEN}`
        })
    })
})
export const {useGetMoviesQuery,useGetGenresQuery,useGetMovieDetailsQuery,useGetRecommandationsQuery,useGetActorQuery,useGetActorMoviesQuery} = moviesSlice