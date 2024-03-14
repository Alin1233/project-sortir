/* eslint-disable react/prop-types */
import SearchBar from './SearchBar'
import SearchParDate from './SearchParDate'

const Filtre = (props) => {

    return (
        <div>
            <SearchBar sorties={props.sorties} setSorties={props.setSorties}/>
            <SearchParDate/>
        </div>
    )
}

export default Filtre