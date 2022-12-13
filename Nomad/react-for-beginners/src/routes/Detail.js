import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";

function Detail(){
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const {id} = useParams()
    const getMovies = async() =>{
        const response = await fetch(
            `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
        )
        const json = await  response.json();
        console.log(json)
        setMovie(json.data.movie.title)
        setLoading(false);
    }
    useEffect(() => {
        getMovies()
    })
    
    return (
        <div>
          {loading ? <h1> Loading...</h1> 
          :  
          <div>
            <h1> Detail</h1>
            <div>
                {movie}
            </div>
          </div>}
        </div>
      )
}
export default Detail;