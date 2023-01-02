import { useRouter } from "next/router"

export default function Detail({params}){
    const router = useRouter()
    const [title, id, poster_path] = params 
    return (
        <>
        {poster_path}
        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} />
        <div>
            {id} {title || "Loading"} 
        </div>
        </>
    )
}

export function getServerSideProps({params : {params}}){
    return {
        props: {
            params
        }
    }
}