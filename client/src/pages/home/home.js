import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../components/loader/loader';
import TogglePageLimit from '../../components/togglePageLimit/togglePageLimit';
import Pagination from '../../components/pagination/pagination';
import SearchBar from '../../components/searchBar/searchBar';
import MainDisplay from '../../components/mainDisplay/mainDisplay';

function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState('loading');
  const [pageNum, setPageNum] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [input, setInput] = useState('');
  const [displayCountries, setDisplayCountries] = useState({
    data: [],
    pages: 0
  });

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setTimeout(() => {
          setCountries(res.data);
          setDisplayCountries({
            data: res.data,
            pages: Math.ceil(res.data.length / pageLimit)
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
    const results = countries.filter(c => flatten(c, input));
    setDisplayCountries({
      data: results,
      pages: Math.ceil(results.length / pageLimit)
    });
    setPageNum(results.length ? 1 : 0)
  }

  const flatten = (obj, target) => {
    return Object.values(obj).some(v =>
      v !== null && typeof v === 'object'
        ? flatten(v) :
        `${v}`.toLowerCase().search(`${target}`.trim()) !== -1
    )
  }

  const handleClear = () => {
    setInput('');
    setDisplayCountries({
      data: countries,
      pages: Math.ceil(countries.length / pageLimit)
    })
    setPageNum(1);
  }

  const handlePageLimit = (e) => {
    const num = e.target.getAttribute('data')
    setPageLimit(num)
    setDisplayCountries({
      ...displayCountries,
      pages: Math.ceil(displayCountries.data.length / num)
    })
  }


  return (
    <div className='container'>
      <div>
        <SearchBar input={input} handleInput={handleInput} handleSearch={handleSearch} />
        <MainDisplay displayCountries={displayCountries} pageNum={pageNum} pageLimit={pageLimit} />
        <Pagination displayCountries={displayCountries} pageNum={pageNum} paginate={paginate} handleClear={handleClear} />
      </div>
      <TogglePageLimit handlePageLimit={handlePageLimit} />
      <Loader loading={loading} />
    </div>
  )
}

export default Home
