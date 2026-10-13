import db from "#db/client";

await db.connect();
await seed();

console.log("🌱 Database seeded.");

async function seed() {
  await db.query(`
  INSERT INTO tracks (name, duration_ms)
  VALUES
  ('Midnight Drive', 210000),
      ('Golden Hour', 185000),
      ('Ocean Eyes', 240000),
      ('City Lights', 195000),
      ('Wildflower', 220000),
      ('Slow Motion', 205000),
      ('Paper Planes', 230000),
      ('Summer Rain', 190000),
      ('Electric Heart', 215000),
      ('Moonlight', 200000),
      ('Better Days', 225000),
      ('Runaway', 240000),
      ('Dreaming Again', 180000),
      ('Afterglow', 210000),
      ('Gravity', 235000),
      ('Wildfire', 195000),
      ('Blue Skies', 205000),
      ('Last Summer', 220000),
      ('Starlight', 245000),
      ('New Beginnings', 190000);
      `);
  await db.query(
    `INSERT INTO playlists (name,description)
  VALUES
   ('Morning Motivation', 'Songs to start the day'),
      ('Chill Vibes', 'Relaxing songs for downtime'),
      ('Road Trip', 'Music for long drives'),
      ('Summer Hits', 'Sunny day favorites'),
      ('Late Night', 'Songs for after dark'),
      ('Workout Mix', 'High-energy songs'),
      ('Study Session', 'Background music for focus'),
      ('Heartbreak', 'Emotional songs'),
      ('Party Time', 'Songs for a get-together'),
      ('Fresh Starts', 'Songs for a new beginning');`,
  );
  await db.query(`
    INSERT INTO playlists_tracks (playlist_id, track_id)
    VALUES
    (
    (SELECT id FROM playlists WHERE name = 'Late Night'),
    (SELECT id FROM tracks WHERE name = 'Blue Skies')
    ),
     (
    (SELECT id FROM playlists WHERE name = 'Road Trip'),
    (SELECT id FROM tracks WHERE name = 'Electric Heart')
    ),
     (
    (SELECT id FROM playlists WHERE name = 'Chill Vibes'),
    (SELECT id FROM tracks WHERE name = 'Afterglow')
    ),
     (
    (SELECT id FROM playlists WHERE name = 'Workout Mix'),
    (SELECT id FROM tracks WHERE name = 'Summer Rain')
    ),
     (
    (SELECT id FROM playlists WHERE name = 'Morning Motivation'),
    (SELECT id FROM tracks WHERE name = 'Starlight')
    ),
     (
    (SELECT id FROM playlists WHERE name = 'Summer Hits'),
    (SELECT id FROM tracks WHERE name = 'Dreaming Again')
    ),
     (
    (SELECT id FROM playlists WHERE name = 'Study Session'),
    (SELECT id FROM tracks WHERE name = 'Paper Planes')
    ),
     (
    (SELECT id FROM playlists WHERE name = 'Study Session'),
    (SELECT id FROM tracks WHERE name = 'Wildfire')
    ),
     (
    (SELECT id FROM playlists WHERE name = 'Party Time'),
    (SELECT id FROM tracks WHERE name = 'Gravity')
    ),
     (
    (SELECT id FROM playlists WHERE name = 'Heartbreak'),
    (SELECT id FROM tracks WHERE name = 'Moonlight')
    ),
     (
    (SELECT id FROM playlists WHERE name = 'Fresh Starts'),
    (SELECT id FROM tracks WHERE name = 'Blue Skies')
    ),
     (
    (SELECT id FROM playlists WHERE name = 'Road Trip'),
    (SELECT id FROM tracks WHERE name = 'Slow Motion')
    ),
     (
    (SELECT id FROM playlists WHERE name = 'Chill Vibes'),
    (SELECT id FROM tracks WHERE name = 'City Lights')
    ),
     (
    (SELECT id FROM playlists WHERE name = 'Study Session'),
    (SELECT id FROM tracks WHERE name = 'Ocean Eyes')
    ),
     (
    (SELECT id FROM playlists WHERE name = 'Fresh Starts'),
    (SELECT id FROM tracks WHERE name = 'New Beginnings')
  );
  `);
}
await db.end();
