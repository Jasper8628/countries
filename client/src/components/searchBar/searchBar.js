import React from 'react'

function SearchBar({ input, handleInput, handleSearch }) {
  return (
    <div>
      <input value={input} onChange={handleInput} />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default SearchBar
