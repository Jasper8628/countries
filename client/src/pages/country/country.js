import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Loader from '../../components/loader/loader';

function Country() {
  const location = useLocation();
  const { flag, name, population, demonym } = location.state;
  const [loading, setLoading] = useState('loading');
  const [data, setData] = useState({})
  useEffect(() => {
    setTimeout(() => {
      setData({
        flag,
        name,
        population: `Population: ${population}`,
        demonym: `Demonym: ${demonym}`
      })
      setLoading('loaded')
    }, 500);
  })
  return (
    <div className='container'>
      <h1>{data.name}</h1>
      <img alt='' src={data.flag} />
      <h3>{data.population}</h3>
      <h3>{data.demonym}</h3>
      <Loader loading={loading} />
    </div>
  )
}

export default Country
