import React from 'react'
//styles
import '../../Styles/Pagination.css'

const Paginado = ({videogamesPerPage, allVideogames, paginado}) => {
	const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push([i]);
  }

  return (
    <div>
      <nav>
        <ul className="pagination">
          {pageNumbers &&
            pageNumbers.map((number) => (
              <a key={number} value={number} onClick={() => paginado(number)}>
                {number}
              </a>
            ))}
        </ul>
      </nav>
    </div>
  );
}

export default Paginado