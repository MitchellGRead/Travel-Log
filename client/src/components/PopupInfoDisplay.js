/**
 * Popup display to hold information regarding a certain marker
 * Version 1.0.0
 * Mitchell Read
 */

// Import external libraries/dependencies
import React, { useState } from 'react';

// Import custom components or dependencies
import PopupInfo from './PopupInfo';
import LogEntryForm from './LogEntryForm';

const PopupInfoDisplay = (props) => {
  // Set state variables
  const [editingEntry, setEditingEntry] = useState(false);

  const entryData = props.data;

  return (
    editingEntry ? (
    <LogEntryForm 
      entryData={entryData}
      onClose={() => {
        props.onClose();
        setEditingEntry(false);
      }}
    />) : (
    <PopupInfo 
      entryData={entryData}
      onClose={props.onClose}
      editEntry={setEditingEntry}
    />)
  );
};

export default PopupInfoDisplay;