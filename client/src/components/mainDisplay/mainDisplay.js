import React from 'react'
import { Link } from 'react-router-dom'

function MainDisplay({ displayCountries, pageNum, pageLimit }) {
  return (
    <div>
      {displayCountries.data.length ?
        displayCountries.data.slice((pageNum - 1) * pageLimit, pageNum * pageLimit).map(country => (
          <h4 key={country.name}>
            <Link to={{
              pathname: '/country',
              state: {
                name: country.name,
                flag: country.flag,
                population: country.population,
                demonym: country.demonym
              }
            }} >
              {country.name}
            </Link></h4>
        )) : <p>No countries found</p>}
    </div>
  )
}

export default MainDisplay
