/**
 * Form UI to create an entry that will be entered into the database.
 * Version 1.0.0
 * Mitchell Read
 */

// Import external libraries/dependencies
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// Import custom API endpoints or components
import { addLogEntry } from '../api';

const LogEntryForm = (props) => {
  // Define any state variables
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Define constants
  const { register, handleSubmit } = useForm();
  const entryData = props.entryData;

  const onSubmit = (data) => {
    try {
      setLoading(true);
      // Extract files from FileList
      data.images = Object.keys(data.images).map(key => data.images[key]);
      
      const sendMe = new FormData();

      // Add form fields to FormData object
      sendMe.append('title', data.title);
      sendMe.append('comment', data.comment);
      Object.keys(data.images).forEach(key => sendMe.append('images', data.images[key]));
      sendMe.append('visitDate', data.visitDate);
      sendMe.append('rating', data.rating);
      sendMe.append('latitude', entryData.latitude);
      sendMe.append('longitude', entryData.longitude);

      addLogEntry(sendMe);
      props.onClose();      
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  return (
    <div className='log-entry-form-container'>
      <form onSubmit={handleSubmit(onSubmit)} className='entry-form' encType='multipart/form-data'>
        {error ? <h3>{error}</h3> : null}
        <label htmlFor='title'>Title</label>
        <input required name='title' placeholder='Where did you go?' ref={register}/>

        <label htmlFor='comment'>Comments</label>
        <textarea name='comment' placeholder='Enter a comment or two' rows={3} ref={register}/>

        <div className='image-upload'>
          <label htmlFor='images'>Images</label>
          <input type='file' accept='image/png image/jpeg' name='images' multiple ref={register}/>
        </div>

        <div className='form-row'>
          <div className='form-column'>
            <label htmlFor='visitDate'>Visit Date</label>
            <input required type='date' name='visitDate' defaultValue={new Date().toISOString().substr(0, 10)} ref={register}/>
          </div>
          
          <div className='form-column'>
            <label htmlFor='rating'>Rating</label>
            <input type='number' name='rating' min={1} max={10} defaultValue={5} ref={register}/>
          </div>
        </div>

        <input 
          type='submit' 
          disabled={loading} 
          className='btn form-btn green-btn' 
          value={loading ? 'Loading...' : 'Submit'}
        />
        <input 
          type='reset'
          disabled={loading}
          className='btn form-btn caution-btn' 
          value='Reset' 
        />
      </form>
    </div>
  );
};

export default LogEntryForm;