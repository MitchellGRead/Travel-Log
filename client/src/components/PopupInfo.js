/**
 * Displays information on the selected popup
 * Version 1.0.0
 * Mitchell Read
 */

// Import external libraries/dependencies
import React from 'react';

// Import custom components or API
import { deleteLogEntry } from '../api';


const PopupInfo = (props) => {
  const entryData = props.entryData;
  const editEntry = props.editEntry;

  return (
    <div className='popup-info'>
      <h3>{entryData.title}</h3>
      <p>{entryData.comment}</p>
      <div className='popup-footer-info'>
        <p>Rating: {entryData.rating}</p>
        <p>Visted: {new Date(entryData.visitDate).toISOString().substr(0, 10)}</p>
      </div>
      <div className='popup-buttons'>
        <button type='button' className='btn red-btn' onClick={async () => {
          await deleteLogEntry(entryData);
          props.onClose();
        }}>Delete</button>
        <button type='button' className='btn caution-btn' onClick={() => {
          editEntry(true);
        }}>Edit</button>
        {/* <button type='button' className='btn green-btn' disabled={true}>Add</button> */}
      </div>
    </div>
  );
};

export default PopupInfo;