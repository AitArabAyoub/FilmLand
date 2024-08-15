import axios from "axios"
export const getSessionId = async()=>{
    try{
        const req = await axios.post("https://api.themoviedb.org/3/authentication/session/new?api_key=6d27a62dd65d3cb1591155a255d35a2d",{
            request_token : localStorage.getItem("request_token")
        })
        const res = req.data.session_id
        localStorage.setItem("sesid",res) 
        return res
    }catch{
        console.log("you didn't get a request token")
    }
}