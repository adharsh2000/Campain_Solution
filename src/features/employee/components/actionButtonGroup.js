import React from 'react'

const ActionButtonGroup = ({isEdit, isSubmit, resetCallback}) => {

    const resetCallbackFn = () => {
      resetCallback();
    }

    if (isEdit) {
        return (
            <>
            <div class="col-md-12 inline-spacing text-end">
              <button type="submit" class="btn btn-primary" disabled={isSubmit}>Update</button>
              </div>
            </>
        )
      } else {
        return (
            <>
            <div class="col-md-12 inline-spacing text-end">
              <button type="button" onClick={resetCallbackFn} class="btn btn-secondary">Reset</button>
              <button type="submit" class="btn btn-primary" disabled={isSubmit} >Submit</button>
              </div>
            </>
        )
      }
}

export default ActionButtonGroup