/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import serviceCampus from "../services/serviceCampus";
import { Select, Flex, Spinner } from "@chakra-ui/react";
const SearchParCampus = (props) => {

    const [campuses, setCampuses ] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
          const response = await serviceCampus.getAllCampusNoms();
          setCampuses(response)
        };
      
        fetchData();
      }, []);
    //data is loading
     if(campuses===null){
        return <Flex justifyContent="center" alignItems="center" height="100vh">
                    <Spinner />
                </Flex>
     }
    return (
        <Select placeholder="Selectionnez un campus" value={props.value} onChange={props.onChange} maxW="300px">
        {campuses.map((campus) => (
          <option key={campus.id} value={campus.nom}>
            {campus.nom}
          </option>
        ))}
      </Select>
    )
}

export default SearchParCampus