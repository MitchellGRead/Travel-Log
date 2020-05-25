/**
 * Sidebar to display images if any when a marker is selected
 * Version 1.0.0
 * Mitchell Read
 */

// Import external libraries/dependencies
import React, { useState, useEffect } from 'react';

// Custom components or API
import { getImages } from '../api';


const Sidebar = (props) => {
  const [imageUrls, setImageUrls] = useState([]);

  const sidebarAction = props.action ? 'enter' : 'exit';  // animated via css
  const entryData = props.data;

  // Function to get image addresses from the serer
  const getImageAddress = async (entryData) => {
    const pathes = await getImages(entryData.images);
    setImageUrls(pathes.data);
  }

  useEffect(() => {    
    if (entryData && entryData.images.length > 0) {
      getImageAddress(entryData);    
    }
  }, [entryData]);
  
  let images = null;
  if (entryData && entryData.images.length > 0) {

    images = imageUrls.map((imageUrl, idx) => {
      return (<li key={`${entryData._id}-${idx}`}>
        <img
          className='sidebar-img'
          src={imageUrl}
          alt={`${entryData.title}-${entryData.visitDate}`}
        /></li>);
    });    
  }

  return (
    <div className={`sidebar sidebar-${sidebarAction}`}>
      <div className='entry-images'>
        {images !== null && <h3 className='image-title'>{new Date(entryData.visitDate).toISOString().substr(0, 10)}</h3>}
        <ul>
          {images}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;