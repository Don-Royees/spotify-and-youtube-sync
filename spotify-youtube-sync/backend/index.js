import {
  getToken,
  getClientId,
  getClientSecret,
  getAuthorizationCode,
  getRefreshToken,
  getAccessToken,
  getExpiryTime,
  getSongs,
  setAccessToken,
  setRefreshToken,
  setExpiryTime,
  getPlaylists,
} from './SpotifyController.js';
import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;
const authCode = '';

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Or restrict to 'http://localhost:8080'
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
//used to get authcode so that it can be exchange for access token and refresh token
app.get('/spotify-auth-data', async (req, res) => {
  const spotifyAuthUrl = 'https://accounts.spotify.com/authorize';
  const clientId = getClientId();
  const redirectUri = `http://127.0.0.1:3000/spotifycallback`;
  const state = generateRandomString(16);

  const fullUrl =
    spotifyAuthUrl +
    '?' +
    new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirectUri,
      state: state,
    });

  res.redirect(fullUrl);
});

app.get('/youtube-auth-data', async (req, res) => {
  console.log('hello');
});
app.get('/get_playlist', async (req, res) => {
  const playlistId = req.query.playlist_id;
  if (getExpiryTime) {
    const data = await getSongs(getAccessToken, playlistId);
    console.log(data);
  } else {
    console.log('token is expired');
  }
});

//after user logged in it calls back to this part of the page
app.get('/spotifycallback', async (req, res) => {
  const authorizationCode = req.query.code || null;
  const state = req.query.state || null;
  const clientId = getClientId();
  const clientSecret = getClientSecret();
  try {
    const result = await getAuthorizationCode(authorizationCode);
    setAccessToken(result.access_token);
    setRefreshToken(result.refresh_token);
    setExpiryTime();
    return res.redirect('http://localhost:5500?success=true');
  } catch (error) {
    console.error('Error getting tokens:', error);
    return res.redirect('http://localhost:5500?success=false');
  }
});

export const createToken = async () => {
  return getToken();
};

function generateRandomString() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const getAuthCode = () => {
  return authCode;
};
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
export { getAuthCode };
