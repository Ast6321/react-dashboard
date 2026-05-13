function ViewToggle({
  viewMode,
  setViewMode
}) {

  return(

    <div className="view-toggle">

      <button
        className={
          viewMode === "table"
          ? "active-view"
          : ""
        }

        onClick={() =>
          setViewMode("table")
        }
      >

        Table View

      </button>



      <button
        className={
          viewMode === "grid"
          ? "active-view"
          : ""
        }

        onClick={() =>
          setViewMode("grid")
        }
      >

        Grid View

      </button>

    </div>

  )

}



export default ViewToggle