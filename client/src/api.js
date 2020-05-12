/**
 * Used to communicate with backend server on the /api/logs endpoint using axios
 * Version 1.0.0
 * Mitchell Read
 */

// Import external libraries/dependencies
import axios from 'axios';

const API_URL = 'http://localhost:4000';

export function getLogEntries() {
  return axios.get(`${API_URL}/api/log_entry/get_entries`);
}