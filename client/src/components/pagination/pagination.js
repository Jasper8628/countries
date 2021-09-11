import React from 'react'

function Pagination({ pageNum, displayCountries, handleClear, paginate }) {
  return (
    <div>
      <button className='fas fa-chevron-left' name='button-left' onClick={paginate} disabled={pageNum - 1 <= 0 ? true : false} />
      <span>Page {pageNum}/{displayCountries.pages}</span>
      <button className='fas fa-chevron-right' name='button-right' onClick={paginate} disabled={pageNum + 1 > displayCountries.pages ? true : false} />
      <button onClick={handleClear}>Clear</button>
    </div>
  )
}

export default Pagination
