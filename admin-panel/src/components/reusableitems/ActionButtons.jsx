function ActionButtons({

  onEdit,

  onDelete

}) {

  return (

    <div className="action-buttons">

      <button
        className="edit-btn"

        onClick={onEdit}
      >

        Edit

      </button>

      <button
        className="delete-btn"

        onClick={onDelete}
      >

        Delete

      </button>

    </div>

  )

}

export default ActionButtons