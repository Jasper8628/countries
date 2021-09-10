import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../components/loader/loader';
import { Link } from 'react-router-dom'

function Home() {
  const [countries, setCountries] = useState([]);
  const [displayCountries, setDisplayCountries] = useState({
    data: [],
    pages: 0
  });
  const [loading, setLoading] = useState('loading');
  const [pageNum, setPageNum] = useState(1);
  const [input, setInput] = useState('');
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setTimeout(() => {
          setCountries(res.data);
          setDisplayCountries({
            data: res.data,
            pages: Math.ceil(res.data.length / 10)
          });
          setLoading('loaded');

        }, 500);
      })
  }, []);

  const paginate = (e) => {
    const name = e.target.getAttribute('name');
    setPageNum(name === 'button-left' ? pageNum - 1 : pageNum + 1);
  }

  const handleInput = (e) => {
    const { value } = e.target;
    setInput(`${value}`.toLowerCase());
  }

  const handleSearch = () => {
    const results = countries.filter(c => flatten(c).includes(input.trim()));
    setDisplayCountries({
      data: results,
      pages: Math.ceil(results.length / 10)
    });
    setInput('');
    setPageNum(1)
  }

  const handleClear = () => {
    setDisplayCountries({
      data: countries,
      pages: Math.ceil(countries.length / 10)
    })
  }

  const flatten = (o) => {
    return [].concat(...Object.values(o).map(v => v !== null && typeof v === 'object' ? flatten(v) : `${v}`.toLowerCase()))
  }

  return (
    <div className='container'>
      <div>
        <input value={input} onChange={handleInput} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <ul>
          {displayCountries.data.slice((pageNum - 1) * 10, pageNum * 10).map(country => (
            <h2 key={country.name}>
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
              </Link></h2>
          ))}

        </ul>
      </div>
      <div>
        <button className='fas fa-chevron-left' name='button-left' onClick={paginate} disabled={pageNum - 1 <= 0 ? true : false} />
        <span>Page {pageNum}/{displayCountries.pages}</span>
        <button className='fas fa-chevron-right' name='button-right' onClick={paginate} disabled={pageNum + 1 > displayCountries.pages ? true : false} />
        <button onClick={handleClear}>Clear</button>
      </div>
      <Loader loading={loading} />
    </div>

  )
}

export default Home
