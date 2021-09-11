import React from 'react'

function Pagination({ pageNum, pages, handleClear, paginate }) {
  return (
    <div>
      <button className='fas fa-chevron-left' name='button-left' onClick={paginate} disabled={pageNum - 1 <= 0 ? true : false} />
      <span>Page {pageNum}/{pages}</span>
      <button className='fas fa-chevron-right' name='button-right' onClick={paginate} disabled={pageNum + 1 > pages ? true : false} />
      <button onClick={handleClear}>Clear</button>
    </div>
  )
}

export default Pagination
