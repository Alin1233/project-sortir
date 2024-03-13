import { useParams } from "react-router-dom"



const Sortie = () => {

    const id = useParams().id
    return (
        <div>Sortie
            <p>This is srotie with id: {id}</p>
        </div>
    )
}

export default Sortie