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


function App() {
  // Define state hooks
  const [logEntries, setLogEntries] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 54.5260,
    longitude: -105.2551,
    zoom: 3,
  });

  const getEntries = async () => {
    const allEntries = await getLogEntries();    
    setLogEntries(allEntries.data);
  }

  // Load up the entries when component is mounted
  useEffect(() => {
    getEntries();
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        width='100vw'
        height='100vh'
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        doubleClickZoom={false}
      >

      </ReactMapGL>
    </div>
  );
}

export default App;
