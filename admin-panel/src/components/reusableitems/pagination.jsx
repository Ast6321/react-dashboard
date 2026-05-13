function Pagination({

  currentPage,

  totalPages,

  setCurrentPage

}) {



function handlePrev(){

  if(currentPage > 1){

    setCurrentPage(currentPage - 1)

  }

}



function handleNext(){

  if(currentPage < totalPages){

    setCurrentPage(currentPage + 1)

  }

}



function renderPaginationButtons(){

  let buttons = []



  for(

    let i = 1;

    i <= totalPages;

    i++

  ){




    if(

      i === 1 ||

      i === totalPages ||

      (

        i >= currentPage - 1 &&

        i <= currentPage + 1

      )

    ){




      buttons.push(

        <button

          key={i}

          className={

            currentPage === i

            ? "active-page"

            : ""

          }

          onClick={() =>

            setCurrentPage(i)

          }
        >

          {i}

        </button>

      )

    }




    else if(

      i === currentPage - 2 ||

      i === currentPage + 2

    ){




      buttons.push(

        <span

          key={i}

          className="dots"
        >

          ...

        </span>

      )

    }

  }



  return buttons

}



  return (

    <div className="pagination">

      <button

        onClick={handlePrev}

        disabled={currentPage === 1}
      >

        Prev

      </button>



      {renderPaginationButtons()}



      <button

        onClick={handleNext}

        disabled={currentPage === totalPages}
      >

        Next

      </button>

    </div>

  )

}

export default Pagination