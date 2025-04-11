const Search = ({ search, handleSearch }) => {
  return (
    <>
      <label htmlFor='search'>Filter shown with </label>
      <input id='search' value={search} onChange={handleSearch} />
    </>
  )
}

export default Search