import axios from 'axios';
import api from '../config';
import endpoints from '../constants';

const getAccessToken = async () => {
    const result = await fetch(api.authUrl, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + (new Buffer(api.clientId + ':' + api.clientSecret).toString('base64'))
        },
        body: 'grant_type=client_credentials',
    });

    const data = await result.json();
    return data.access_token;
}

export async function updateAxiosToken() {
    const token = await getAccessToken();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export async function getNewReleases() {
    await updateAxiosToken();
  
    const url = `${api.baseUrl}${endpoints.newReleases}`;
    try {
      const response = await axios.get(url);
  
      return response.data.albums.items;
    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      } else {
        console.log(error);
        return error
      }
  
    }
}

export async function getFeaturedPlaylists() {
    await updateAxiosToken();
  
    const url = `${api.baseUrl}${endpoints.featuredPlaylists}`;
  
    try {
      const response = await axios.get(url);
  
      return response.data.playlists.items;
    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      } else {
        console.log(error);
        return error
      }
  
    }
}

export async function getCategories() {
    await updateAxiosToken();
  
    const url = `${api.baseUrl}${endpoints.categories}`;
  
    try {
      const response = await axios.get(url);
  
      return response.data.categories.items;
    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      } else {
        console.log(error);
        return error
      }
  
    }
}
