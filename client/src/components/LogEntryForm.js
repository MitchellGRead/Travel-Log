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
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    try {
      data.images = Object.keys(data.images).map(key => data.images[key]);
      
      const sendMe = new FormData();
      
      Object.keys(data.images).forEach(key => sendMe.append('images', data.images[key]));
      addLogEntry(sendMe);
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='log-entry-form-container'>
      <form onSubmit={handleSubmit(onSubmit)} className='entry-form' encType='multipart/form-data'>
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
            <input required type='date' name='visitDate' ref={register}/>
          </div>
          
          <div className='form-column'>
            <label htmlFor='rating'>Rating</label>
            <input type='number' name='rating' placeholder='Where did you go?' ref={register}/>
          </div>
        </div>

        <input type='submit' className='btn form-btn green-btn' value='Submit'/>
        <input type='reset' className='btn form-btn caution-btn' value='Reset' />
      </form>
    </div>
  );
};

export default LogEntryForm;