import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";

export default function Search() {
  const [data, setData] = useState([]); 

  const [offset, setOffset] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [searchField, setsearchField] = useState();
  const [selectedPage, setSelectedPage] = useState(0);
  const [loader, setLoader] = useState();
  async function fetchData(query, page = 0) {
    if (!query) {
      return;
    }

    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${page}`;
    const { data } = await axios.get(url);
    
    const { totalItems } = data;
    const totalPages = totalItems / offset;
    setPageCount(Math.floor(totalPages));
    setData(data.items);
  }
  const handleSearch = (data) => {
    console.log("data", data.target.value);
    fetchData(data.target.value, selectedPage);
    setsearchField(data.target.value);
  };
  const handlePageClick = ({ selected }) => {
    console.log("e", selected);
    fetchData(searchField, selected);
    setSelectedPage(selected);
  };
  return (
    <div className="commentBox">
          <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
               
                      <input onChange={handleSearch} value={searchField} className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"/>
                       
           </header>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
      <div>
        <RenderResult books={data}></RenderResult>
      </div>
    </div>
  );
}

function RenderResult({ books }) {
  return (
    
         <div>
                   

      {Array.isArray(books) &&
        books.map((book,i) => {

          return (
            <div className="container" style={{marginBottom:20}}>
            <div className="list-group">
                <a key={i} href={book.volumeInfo.canonicalVolumeLink} className="list-group-item list-group-item-action flex-column align-items-start active">
                    <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{book.volumeInfo.title}</h5>
                    <small>{book.volumeInfo.authors}</small>
                        
                    </div>
                    <p className="mb-1">{book.volumeInfo.description}</p>
                    
                </a>
        </div>
        </div>
          ) 
          
        })}
    </div>
  );
}