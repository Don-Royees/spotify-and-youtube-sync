const spotify_button = document.getElementById('spotify_b');
if (spotify_button) {
  //const check if a spotify link button has been pressed
  spotify_button.addEventListener('click', async () => {
    window.location.href = 'http://127.0.0.1:3000/spotify-auth-data';
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const success = params.get('success');
    if (success === 'true') {
      window.location.href = 'http://localhost:5500';
    } else {
      const error_message = document.getElementById('error_m');
      error_message.textContent = "spotify account couldn't be connected ";
    }
  });
}

const youtube_button = document.getElementById('yt_music_b');
if (youtube_button) {
  //const check if a spotify link button has been pressed
  youtube_button.addEventListener('click', async () => {
    window.location.href = 'http://127.0.0.1:3000/youtube-auth-data';
  });
}
// used to redirect to the playlist syncing website
const playlist_button = document.getElementById('playlist_sync_b');
if (playlist_button) {
  playlist_button.addEventListener('click', () => {
    window.location.href = 'playlist.html';
  });
}
//will take the shared playlist code and use it for submit to get data
const submit_spotify = document.getElementById('submit_spotify_b');
let playlist_code = null;
if (submit_spotify) {
  submit_spotify.addEventListener('click', async () => {
    result_url = document.getElementById('spotify_url_t').value;
    if (result_url) {
      playlist_code = result_url.substring(34, 56);
    } else {
      console.log('write a url please');
    }
    console.log('http:127.0.0.1:3000/get_playlist?playlist_id=', playlist_code);
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/get_playlist?playlist_id=${playlist_code}`
      );
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  });
}
const return_main = document.getElementById('return_main_b');
if (return_main) {
  return_main.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}
