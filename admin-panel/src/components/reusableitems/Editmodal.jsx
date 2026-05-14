function EditModal({

  isOpen,

  title,

  onClose,

  onSave,

  children

}) {

  if (!isOpen) {

    return null

  }

  return (

    <div className="modal-overlay">

      <div className="edit-modal">

        <div className="modal-top">

          <h2>
            {title}
          </h2>

          <button
            className="modal-close-btn"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <div className="modal-body">

          {children}

        </div>

        <div className="modal-actions">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={onSave}
          >
            Save
          </button>

        </div>

      </div>

    </div>

  )

}

export default EditModal