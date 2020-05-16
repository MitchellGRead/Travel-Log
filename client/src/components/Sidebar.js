/**
 * Sidebar to display images if any when a marker is selected
 * Version 1.0.0
 * Mitchell Read
 */

// Import external libraries/dependencies
import React from 'react';


const Sidebar = (props) => {
  const sidebarAction = props.action ? 'enter' : 'exit';
  const entryData = props.data;
  console.log(props.action);
  

  return (
    <div className={`sidebar sidebar-${sidebarAction}`}>
      <div className='entry-images'>
        <h3 className='image-title'>2020-01-01</h3>
        <ul>
          <li>
            <img 
              className='sidebar-img'
              src='https://www.tourismvictoria.com/sites/default/files/victoria_inner_harbour_flowers.jpg' 
              alt='thing' 
            />
            <img 
              className='sidebar-img'
              src='https://www.tourismvictoria.com/sites/default/files/victoria_inner_harbour_flowers.jpg' 
              alt='thing' 
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;