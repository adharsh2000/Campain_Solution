import React from 'react';

const ActionButton = ({ isEdit, isSubmit, onReset }) => {
  const resetCallbackFn = () => {
    if (onReset) {
      onReset();
    }
  };

  if (isEdit) {
    return (
      <div className="col-md-12 inline-spacing text-end">
        <button type="submit" className="btn btn-primary" disabled={isSubmit}>
          Update
        </button>
      </div>
    );
  } else {
    return (
      <div className="col-md-12 inline-spacing text-end">
        <button type="button" onClick={resetCallbackFn} className="btn btn-secondary">
          Reset
        </button>
        <button type="submit" className="btn btn-primary" disabled={isSubmit}>
          Submit
        </button>
      </div>
    );
  }
};

export default ActionButton;
