import db from "#db/client";

export async function getTracks() {
  const SQL = `SELECT * FROM tracks;`;
  const { rows } = await db.query(SQL);
  return rows;
}
export async function getOneTrack(id) {
  const SQL = `
    SELECT * from tracks WHERE id =$1`;
  const { rows } = await db.query(SQL, [id]);
  return rows[0];
}
export async function getPlaylists() {
  const SQL = ` SELECT * FROM playlists`;
  const { rows } = await db.query(SQL);
  return rows;
}
export async function getOnePlaylist(id) {
  const SQL = ` SELECT * FROM playlists WHERE id =$1`;
  const { rows } = await db.query(SQL, [id]);
  return rows[0];
}
export async function createPlaylist({ name, description }) {
  const SQL = `
INSERT INTO playlists (name,description)
VALUES ($1, $2)
RETURNING *;
`;
  const { rows } = await db.query(SQL, [name, description]);
  return rows[0];
}
export async function getPlaylistTracks(id) {
  const SQL = `
SELECT tracks.* 
FROM tracks 
JOIN playlists_tracks 
ON tracks.id = playlists_tracks.track_id 
WHERE playlists_tracks.playlist_id =$1;
`;
  const { rows } = await db.query(SQL, [id]);
  return rows;
}
export async function addTrackToPlaylist({ playlist_id, track_id }) {
  const SQL = `INSERT INTO playlists_tracks (playlist_id, track_id)
    VAlUES ($1,$2)
    RETURNING *;
    `;
  const { rows } = await db.query(SQL, [playlist_id, track_id]);
  return rows[0];
}
