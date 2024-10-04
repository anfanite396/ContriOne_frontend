import axios from 'axios';
import { BASE_URL } from '../consts';

export const fetchRepos = async(username) => {
    try {
        const response = await axios.get(`${BASE_URL}/${username}/repos`, { withCredentials: true });
        return response.data
    } catch(error){
        console.error("Something wrong happened while connecting with backend");
        throw error;
    }
};

export const fetchEvents = async(username) => {
    try {
        const response = await axios.get(`${BASE_URL}/${username}/events`, { withCredentials: true });
        return response.data
    } catch(error){
        console.error("Something wrong happened while connecting with backend");
        throw error;
    }
};

export const fetchUser = async(username) => {
    try {
        const response = await axios.get(`${BASE_URL}/${username}`, { withCredentials: true });
        return response.data
    } catch(error){
        console.error("Something wrong happened while connecting with backend");
        throw error;
    }
};