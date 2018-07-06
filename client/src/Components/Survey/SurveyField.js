import React from 'react';

export default ({ input, label, meta: { touched, error } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '-1px' }} />
      <div className="red-text" style={{ marginBottom: '10px' }}>
        {touched && error}
      </div>
    </div>
  );
};
