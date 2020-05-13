/**
 * Used to communicate with backend server on the /api/logs endpoint using axios
 * Version 1.0.0
 * Mitchell Read
 */

// Import external libraries/dependencies
import axios from 'axios';

const API_URL = 'http://localhost:4000';

export async function getLogEntries() {
  return await axios.get(`${API_URL}/api/log_entry/get_entries`);
}

export function addLogEntry(entry) {
  const response = axios.post(`${API_URL}/api/log_entry/add_entry`, entry);
  return response;
}