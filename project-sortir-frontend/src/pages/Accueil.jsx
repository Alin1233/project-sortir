/* eslint-disable react/prop-types */
import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
const Accueil = (props) => {
  const id = props.user.id;
  return (
    <div>
      <p>Accueil</p>
      <Link as={RouterLink} to={`/sortie/${id}`}>This is an example of route with id parameter</Link>
    </div>
  )
}

export default Accueil