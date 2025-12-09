🎧 Spotify ↔ YouTube Playlist Syncer

A simple web app that keeps your Spotify playlists and YouTube playlists in sync. When you update a playlist on one platform, the app automatically reflects those changes on the other side.

🚀 How It Works
1. User Authentication

You log in with your Spotify and YouTube accounts.

The app stores your tokens securely so it can access your playlists.

OAuth is used for both services (Spotify Web API + YouTube Data API).

2. Playlist Selection

You choose which Spotify playlist should sync with which YouTube playlist.

The link between the two is stored in the database.

3. Song Matching Logic

When syncing:

The app fetches all tracks from Spotify.

For each track, it builds a search query using:

Song name

Artist

Optional: album name

It searches YouTube Music for the closest match and adds the video to the playlist.

The process is reversed when syncing from YouTube → Spotify.

4. Automatic Background Syncing

A scheduled cron job runs in the background.

It checks for:

New songs added to either playlist

Removed songs

Differences are automatically updated on the other platform.

5. Web Interface

Built with a simple UI where you can:

Connect accounts

View linked playlists

Trigger a manual sync

See sync status/history

🛠 Tech Stack

Backend: Node.js / Python (your choice depending on your actual setup)

Frontend: Web app UI for linking playlists and showing sync status

APIs:

Spotify Web API

YouTube Data API v3 (via OAuth)

Database: Stores playlist links + tokens

Scheduler: Cron job for background syncing

📦 Running the Project
# Install dependencies
npm install   # or pip install -r requirements.txt

# Start the web server
npm start     # or python app.py

🔒 Security

OAuth tokens are stored securely.

Refresh tokens automatically update to avoid expiration.

📜 License

MIT License.
