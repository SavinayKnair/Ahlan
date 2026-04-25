import * as fs from 'fs';
import * as path from 'path';

const dbPath = path.join(process.cwd(), 'database.json');
const sqlPath = path.join(process.cwd(), 'migrations/seed.sql');

async function migrate() {
  if (!fs.existsSync(dbPath)) {
    console.error('database.json not found');
    return;
  }

  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  let sql = '-- Seed data generated from database.json\n\n';

  // Rooms
  if (data.rooms) {
    for (const room of data.rooms) {
      sql += `INSERT INTO rooms (id, name, size, guests, basePrice, image, desc, features, tag, tagColor, availability) VALUES (
        '${room.id}', 
        '${room.name.replace(/'/g, "''")}', 
        '${room.size}', 
        '${room.guests}', 
        ${room.basePrice}, 
        '${room.image}', 
        '${room.desc.replace(/'/g, "''")}', 
        '${JSON.stringify(room.features)}', 
        '${room.tag}', 
        '${room.tagColor}', 
        '${room.availability}'
      ) ON CONFLICT(id) DO UPDATE SET name=excluded.name;\n`;
    }
  }

  // Packages
  if (data.packages) {
    for (const pkg of data.packages) {
      sql += `INSERT INTO packages (id, title, duration, basePrice, priceSuffix, image, badge, badgeColor, desc, destinations, inclusions, itinerary) VALUES (
        '${pkg.id}', 
        '${pkg.title.replace(/'/g, "''")}', 
        '${pkg.duration}', 
        ${pkg.basePrice}, 
        '${pkg.priceSuffix}', 
        '${pkg.image}', 
        '${pkg.badge}', 
        '${pkg.badgeColor}', 
        '${pkg.desc.replace(/'/g, "''")}', 
        '${JSON.stringify(pkg.destinations)}', 
        '${JSON.stringify(pkg.inclusions)}', 
        '${JSON.stringify(pkg.itinerary)}'
      ) ON CONFLICT(id) DO UPDATE SET title=excluded.title;\n`;
    }
  }

  // Bookings
  if (data.bookings) {
    for (const booking of data.bookings) {
      sql += `INSERT INTO bookings (id, timestamp, status, type, name, phone, email, country, checkIn, checkOut, guests, roomType, addons, notes) VALUES (
        '${booking.id}', 
        '${booking.timestamp}', 
        '${booking.status}', 
        '${booking.type}', 
        '${booking.name.replace(/'/g, "''")}', 
        '${booking.phone}', 
        '${booking.email}', 
        '${booking.country}', 
        '${booking.checkIn}', 
        '${booking.checkOut}', 
        '${booking.guests}', 
        '${booking.roomType}', 
        '${booking.addons.replace(/'/g, "''")}', 
        '${booking.notes.replace(/'/g, "''")}'
      ) ON CONFLICT(id) DO NOTHING;\n`;
    }
  }

  // Settings
  if (data.settings) {
    sql += `INSERT INTO settings (key, value) VALUES ('addonPrices', '${JSON.stringify(data.settings.addonPrices)}') ON CONFLICT(key) DO UPDATE SET value=excluded.value;\n`;
    sql += `INSERT INTO settings (key, value) VALUES ('hourlyRate', '${data.settings.hourlyRate}') ON CONFLICT(key) DO UPDATE SET value=excluded.value;\n`;
    sql += `INSERT INTO settings (key, value) VALUES ('taxes', '${data.settings.taxes}') ON CONFLICT(key) DO UPDATE SET value=excluded.value;\n`;
    sql += `INSERT INTO settings (key, value) VALUES ('seasonalRateMultiplier', '${data.settings.seasonalRateMultiplier}') ON CONFLICT(key) DO UPDATE SET value=excluded.value;\n`;
  }

  fs.writeFileSync(sqlPath, sql);
  console.log('Seed SQL generated at migrations/seed.sql');
}

migrate();
