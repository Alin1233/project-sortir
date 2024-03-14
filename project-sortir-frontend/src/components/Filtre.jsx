/* eslint-disable react/prop-types */
import SearchBar from './SearchBar'
import SearchParCampus from './SearchParCampus'
import SearchParDate from './SearchParDate'
import { Heading } from '@chakra-ui/react'

const Filtre = (props) => {

    return (
        <div>
            <Heading>Filtrer les sorties</Heading>
            <SearchBar sorties={props.sorties} setSorties={props.setSorties}/>
            <SearchParDate/>
            <SearchParCampus/>
        </div>
    )
}

export default Filtre