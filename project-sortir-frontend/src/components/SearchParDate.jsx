/* eslint-disable react/prop-types */
import { Input } from "@chakra-ui/react"

const SearchParDate = (props) => {
  const handleSearch1 = (e) => {
    const newValue = e.target.value;
    props.setSearchDate1(newValue);
  };
  const handleSearch2 = (e) => {
    const newValue = e.target.value;
    props.setSearchDate2(newValue);
  };
  return (
    <div>
      <Input type='date' name='dateLimit' value={props.searchDate1} onChange={handleSearch1} size="md" />
      <Input type='date' name='dateLimit' value={props.searchDate2} onChange={handleSearch2} size="md" />
    </div>
  )
}

export default SearchParDate