/**
 * Used to communicate with backend server on the /api/logs endpoint using axios
 * Version 1.4.0
 * Mitchell Read
 */

// Import external libraries/dependencies
import axios from 'axios';

const API_URL = 'http://localhost:4000';

export async function getLogEntries() {
  return await axios.get(`${API_URL}/api/log_entry/get_entries`);
}

export async function getImages(images) {  
  return await axios.get(`${API_URL}/api/log_entry/get_images/${images.join(',')}`);
}

export async function addLogEntry(entry) {
  return await axios.post(`${API_URL}/api/log_entry/add_entry`, entry);
}

export async function deleteLogEntry(entry) {
  return await axios.post(`${API_URL}/api/log_entry/delete_entry`, entry);
}

export async function editLogEntry(entry) {
  return await axios.post(`${API_URL}/api/log_entry/edit_entry`, entry);
}