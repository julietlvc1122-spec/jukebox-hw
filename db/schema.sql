
CREATE TABLE playlists 
(id serial primary key, 
name text Not null, 
decription text not null);

CREATE TABLE playlists_tracks(
    id serial primary key, 
    playlist_id integer not null REFERENCES playlists(id) ON DELETE CASCADE,
     track_id integer not null REFERENCES tracks(id) ON DELETE CASCADE,
     UNIQUE (playlist_id, track_id));
 CREATE TABLE tracks(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL, 
    duration_ms INTEGER NOT NULL
 );