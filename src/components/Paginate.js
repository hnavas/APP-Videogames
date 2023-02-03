import React from 'react';
import p from './Paginate.module.css'

export default function Paginate({gamesByPage, stateVideogames, actualPage, paginate}) {
  const numOfPages = [];
  const totalPages = Math.ceil(stateVideogames/gamesByPage);
  let page = 1;
  let next = '>>'
  let prev = '<<'

  while(page <= Math.ceil(stateVideogames/gamesByPage)) {
    numOfPages.push(page);
    page++;
  }
  return (
    <div className={p.container}>
      <ul>
        {
          numOfPages && numOfPages.map(num => (
            num === actualPage ?
              <li key={num}>
                <button className={p.selectedPage} onClick={() => paginate(num)}>{num}</button>
              </li>:
              <li key={num}>
                <button className={p.page} onClick={() => paginate(num)}>{num}</button>
              </li>
          ))
        }
      </ul>
      <div>
        {actualPage  > 1 ? <button className={p.btnPage} onClick={()=>paginate(actualPage - 1)}>{prev}</button> : null}
        {actualPage < totalPages ? <button className={p.btnPage}  onClick={()=>paginate(actualPage + 1)}>{next}</button> : null}
      </div>
    </div>
  )

}