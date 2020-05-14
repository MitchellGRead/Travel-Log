/**
 * Main app for travel log
 * Version 1.0.0
 * Mitchell Read
 */

// Import external libraries/dependencies
import React, { useState, useEffect } from 'react';
import ReactMapGL, { Popup } from 'react-map-gl';

// Import custom components or API's
import { getLogEntries } from './api';
import RenderMarkers from './components/RenderMarkers';
import PopupInfo from './components/PopupInfo';
import AddLogEntry from './components/AddLogEntry';


function App() {
  // Define state hooks
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [editingEntry, setEditingEntry] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 54.5260,
    longitude: -105.2551,
    zoom: 3,
  });


  // Retrieves all entries from database
  const getEntries = async () => {
    const allEntries = await getLogEntries();
    setLogEntries(allEntries.data);
  }


  // Load up the entries when component is mounted
  useEffect(() => {
    getEntries();
  }, []);


  // Captures the lat, long when a double click on map occurs
  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude: latitude,
      longitude: longitude,
    });
  };


  return (
    <div>
      {/* Render the map */}
      <ReactMapGL
        {...viewport}
        width='100vw'
        height='100vh'
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        doubleClickZoom={false}
        onDblClick={showAddMarkerPopup}
      >
        {/* Display markers on the map */}
        <RenderMarkers 
          data={logEntries}
          entryToShow={setShowPopup}
          showSidebar={setShowSidebar}
          markerColor='rgb(228, 149, 74)'
        />

        {/* Show entry information popup */}
        {showPopup !== null && (
          <Popup
            latitude={showPopup.latitude}
            longitude={showPopup.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => {
              setShowPopup(null);
              setShowSidebar(false);
              setEditingEntry(false);
            }}
            anchor='left'
            dynamicPosition={true}
          >
            <PopupInfo 
              data={showPopup}
              sideBar={setShowSidebar}
              editEntry={setEditingEntry}
            />
          </Popup>
        )}

        {/* Adding a location popup */}
        {addEntryLocation !== null && (
          <AddLogEntry 
            data={addEntryLocation}
            setEntryLocation={setAddEntryLocation}
            updateEntries={getEntries}
          />
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
