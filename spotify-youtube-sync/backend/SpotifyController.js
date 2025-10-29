import dotenv from 'dotenv';
import { getAuthCode } from './index.js';
dotenv.config();
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
let accessToken = null;
let refreshToken = null;
let expiryTime = null;
const setAccessToken = (_accessToken) => {
  accessToken = _accessToken;
};

const setRefreshToken = (_refreshToken) => {
  refreshToken = _refreshToken;
};

//this is for the access code expiry
const setExpiryTime = () => {
  const now = new Date();
  const expiryTime = new Date(now.getTime + 3600 * 1000);
};

const getExpiryTime = () => {
  const now = new Date();
  if (now > expiryTime) {
    return true;
  }
  return false;
};
// private method to get token
// fetch make a request to spotify endpoint
//this is used to get a temperary token
const getToken = async () => {
  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const data = await result.json();
  return data.access_token;
};

//use to read a playlist
const getSongs = async (accessToken, albumId) => {
  console.log(getAccessToken());
  const result = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  });
  const data = await result.json();
  return data;
};
const getClientId = () => {
  return clientId;
};

const getClientSecret = () => {
  return clientSecret;
};

const getPlaylists = async (getAuthCode) => {
  const auth = hello;
};

const getAccessToken = () => {
  return accessToken;
};

const getRefreshToken = () => {
  return refreshToken;
};
//used to get access token and refresh token
const getAuthorizationCode = async (authorizationCode) => {
  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(getClientId() + ':' + getClientSecret()).toString('base64'),
    },
    body: new URLSearchParams({
      code: authorizationCode,
      redirect_uri: 'http://127.0.0.1:3000/spotifycallback',
      grant_type: 'authorization_code',
    }),
  });
  const data = await result.json();
  return data;
};

// lambada function
// const answer = (a,b) =>{
//  a + b;
// };

// (async () => {
//   const token = await getToken();
//   console.log('spotify token:', token, clientId, clientSecret);
//   const albumId = '0lnZiBZPbGiBuNrMy25Yux';
//   const playlists = await getplaylists(token, albumId);
//   console.log('spotify token:', playlists);
// })();

export {
  getToken,
  getPlaylists,
  getClientId,
  getClientSecret,
  getAuthorizationCode,
  getRefreshToken,
  getAccessToken,
  getExpiryTime,
  getSongs,
  setRefreshToken,
  setAccessToken,
  setExpiryTime,
};
