import React from 'react'

function TogglePageLimit({ handlePageLimit }) {
  return (
    <div>
      <button data={10} onClick={handlePageLimit}>Show 10</button>
      <button data={15} onClick={handlePageLimit}>Show 15</button>
      <button data={20} onClick={handlePageLimit}>Show 20</button>
    </div>
  )
}

export default TogglePageLimit
