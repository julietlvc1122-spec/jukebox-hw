import express from "express";
import {
  getTracks,
  getOneTrack,
  getPlaylists,
  getOnePlaylist,
  createPlaylist,
  getPlaylistTracks,
  addTrackToPlaylist,
} from "db/queries.js";

const app = express();
app.use(express.json());

app.get("/tracks", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});
app.get("/tracks/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).send();
  }
  const track = await getOneTrack(id);
  if (!track) {
    return res.status(404).send();
  }
  return res.status(200).send(track);
});
app.get("/playlists", async (req, res) => {
  const playlists = await getPlaylists();
  res.send(playlists);
});
app.get("/playlists/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).send();
  }
  const playlist = await getOnePlaylist(id);
  if (!playlist) {
    return res.status(404).send();
  }
  return res.status(200).send(playlist);
});
app.get("/playlists/:id/tracks", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).send();
  }
  const playlist = await getOnePlaylist(id);
  if (!playlist) {
    return res.status(404).send();
  }
  const tracks = await getPlaylistTracks(id);
  return res.status(200).send(tracks);
});
app.post("/playlists/:id/tracks", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).send();
  }
  const playlist = await getOnePlaylist(id);
  if (!playlist) {
    return res.status(404).send();
  }
  const trackId = Number(req.body?.trackId);
  if (!req.body || !req.body.trackId || Number.isNaN(trackId)) {
    return res.status(400).send();
  }

  const track = await getOneTrack(trackId);
  if (!track) {
    return res.status(400).send();
  }
  const existingTracks = await getPlaylistTracks(id);
  if (existingTracks.some((existingTracks) => existingTracks.id === trackId)) {
    return res.status(400).send();
  }
  const newTrack = await addTrackToPlaylist({
    playlist_id: id,
    track_id: trackId,
  });
  return res.status(201).send(newTrack);
});
app.post("/playlists", async (req, res) => {
  const { name, description } = req.body || {};
  if (!name || !description) {
    return res.status(400).send();
  }

  const newPlaylist = await createPlaylist({ name, description });
  return res.status(201).send(newPlaylist);
});
export default app;
