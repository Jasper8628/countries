import React from 'react'

function Loader({ loading }) {
  return (
    <div className={`loader ${loading}`}>
      <span className='fas fa-spinner' />

    </div>
  )
}

export default Loader
