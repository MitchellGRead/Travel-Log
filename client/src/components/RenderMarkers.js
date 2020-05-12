/**
 * Creates marker tags that can be rendered to the screen
 * Version 1.0.0
 * Mitchell Read
 */

// Import external libaries/dependencies
import React from 'react';
import { Marker } from 'react-map-gl';

// Uses map to go through the list and make a marker element for each
const RenderMarkers = (props) => {
  const logEntries = props.data;
  const showPopup = props.entryToShow;
  const showSidebar = props.showSidebar;
  const markerColor = props.markerColor;  // color is defined in 

  return (
    logEntries.map(entry => (
      <Marker
        key={entry._id}
        latitude={entry.latitude}
        longitude={entry.longitude}
      >
        <div className='marker-container'
          onClick={() => {
            showPopup(entry);
            showSidebar(true);
          }}
        >
          <svg
            className={'marker'}
            style={{ stroke: markerColor }}
            viewBox='0 0 24 24'
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      </Marker>
    ))
  );
};

export default RenderMarkers;