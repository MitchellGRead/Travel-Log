/**
 * Client UI to create a log entry that will be added to the database
 * Version 1.0.0
 * Mitchell Read
 */

// Import external libraries/dependencies
import React from 'react';
import { Popup } from 'react-map-gl';

// Import custom components
import RenderMarkers from './RenderMarkers';


const AddLogEntry = (props) => {
  const entryData = props.data;
  const setEntryLocation = props.setEntryLocation;
  const updateEntries = props.updateEntries;

  return (
    <React.Fragment>
      {/* Use the RenderMarkers component to create a single red marker where use clicked */}
      <RenderMarkers 
        data={[{
          _id: null, 
          ...entryData,
        }]}
        entryToShow={null}
        showSidebar={false}
        markerColor='#C82333'
      />

      {/* Display popup to hold the form */}
      <Popup 
       latitude={entryData.latitude}
       longitude={entryData.longitude}
       closeButton={true}
       closeOnClick={false}
       onClose={() => {
         setEntryLocation(null);
         updateEntries();
       }}
       anchor='left'
       dynamicPosition={true}
      >

      </Popup>
    </React.Fragment>
  );
};

export default AddLogEntry;


// data = { addEntryLocation }
// setEntryLocation = { setAddEntryLocation }
// updateEntries = { getEntries }