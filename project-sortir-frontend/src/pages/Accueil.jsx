import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
const Accueil = () => {
  const id = 10;
  return (
    <div>
      <p>Accueil</p>
      <Link as={RouterLink} to={`/sortie/${id}`}>This is an example of route with id parameter</Link>
    </div>
  )
}

export default Accueil