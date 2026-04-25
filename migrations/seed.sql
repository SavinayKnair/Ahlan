-- Seed data generated from database.json

INSERT INTO rooms (id, name, size, guests, basePrice, image, desc, features, tag, tagColor, availability) VALUES (
        'deluxe-garden', 
        'Deluxe Garden View Room', 
        '300+ sq ft', 
        'Max 3 Guests', 
        2999, 
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800', 
        'Wake up to tropical greenery. Spacious deluxe room with premium furnishings, king-size bed, and premium ensuite bathroom.', 
        '["King-Size Bed","AC","Smart TV","Premium Bath","Free WiFi","Daily Cleaning"]', 
        'Garden Views', 
        'bg-palm', 
        '3 Rooms Left Today'
      ) ON CONFLICT(id) DO UPDATE SET name=excluded.name;
INSERT INTO rooms (id, name, size, guests, basePrice, image, desc, features, tag, tagColor, availability) VALUES (
        'deluxe-premium', 
        'Deluxe Premium Stay Room', 
        '300+ sq ft', 
        'Max 3 Guests', 
        3499, 
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800', 
        'Elevated comfort with higher floor views and upgraded amenities. Perfect for couples seeking a touch of extra luxury.', 
        '["King-Size Bed","AC","Smart TV","Premium Bath","Free WiFi","Daily Cleaning"]', 
        'Most Popular', 
        'bg-champagne', 
        'Only 1 Left This Weekend'
      ) ON CONFLICT(id) DO UPDATE SET name=excluded.name;
INSERT INTO rooms (id, name, size, guests, basePrice, image, desc, features, tag, tagColor, availability) VALUES (
        'deluxe-family', 
        'Deluxe Family Comfort Room', 
        '350+ sq ft', 
        'Max 4 Guests', 
        4499, 
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800', 
        'Generously sized for families. Extra bedding options, separate seating area, and child-friendly setup.', 
        '["Multiple Beds","AC","Smart TV","Premium Bath","Free WiFi","Daily Cleaning"]', 
        'Family Favourite', 
        'bg-ocean-light', 
        'Available for Selected Dates'
      ) ON CONFLICT(id) DO UPDATE SET name=excluded.name;
INSERT INTO rooms (id, name, size, guests, basePrice, image, desc, features, tag, tagColor, availability) VALUES (
        'deluxe-couple', 
        'Deluxe Couple Retreat Room', 
        '300+ sq ft', 
        'Max 2 Guests', 
        4999, 
        '/images/room-deluxe-couple.png', 
        'Romantic premium setup with optional rose petal décor, private balcony access, and personalized turndown service.', 
        '["King-Size Bed","AC","Smart TV","Premium Bath","Free WiFi","Rose Décor Option"]', 
        'Romantic', 
        'bg-rose-500', 
        '2 Rooms Available'
      ) ON CONFLICT(id) DO UPDATE SET name=excluded.name;
INSERT INTO packages (id, title, duration, basePrice, priceSuffix, image, badge, badgeColor, desc, destinations, inclusions, itinerary) VALUES (
        'p1', 
        'Romantic Honeymoon Escape', 
        '4 Nights / 5 Days', 
        29999, 
        '/couple', 
        'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=800', 
        'Couple Favourite', 
        'bg-rose-500', 
        'A magical romantic getaway featuring private beach dinners, photoshoots, and sunset cruises.', 
        '["Port Blair","Havelock Island","Neil Island"]', 
        '["Deluxe Stay","All Ferry Tickets","Candlelight Dinner","Beach Photoshoot","Couples Spa","Airport Transfers"]', 
        '[{"day":1,"title":"Arrival & Sunset Cruise","desc":"Airport pickup, check-in to Honeymoon Suite. Evening sunset cruise at Port Blair harbour."},{"day":2,"title":"Havelock Island & Radhanagar","desc":"Premium ferry to Havelock. Visit Asia's best beach, Radhanagar. Evening candlelight dinner."},{"day":3,"title":"Elephant Beach Snorkeling","desc":"Private boat to Elephant Beach for snorkeling. Afternoon couples spa session."},{"day":4,"title":"Neil Island Romance","desc":"Ferry to Neil Island. Visit Natural Bridge and Laxmanpur beach sunset. Return to Port Blair."},{"day":5,"title":"Departure","desc":"Breakfast and airport drop with unforgettable memories."}]'
      ) ON CONFLICT(id) DO UPDATE SET title=excluded.title;
INSERT INTO packages (id, title, duration, basePrice, priceSuffix, image, badge, badgeColor, desc, destinations, inclusions, itinerary) VALUES (
        'p2', 
        'Family Discovery Tour', 
        '5 Nights / 6 Days', 
        18999, 
        '/person', 
        'https://images.unsplash.com/photo-1602088113235-229c19758e9f?auto=format&fit=crop&q=80&w=800', 
        'Family Recommended', 
        'bg-palm', 
        'Safe, comfortable, and engaging trip designed perfectly for families with children of all ages.', 
        '["Port Blair","Havelock Island","Ross Island"]', 
        '["Family Suite Stay","All Ferry Tickets","Glass-Bottom Boat","Kids Activity Kit","Daily Breakfast","Airport Transfers"]', 
        '[{"day":1,"title":"Arrival & Cellular Jail","desc":"Airport pickup. Evening visit to Cellular Jail and Light & Sound show."},{"day":2,"title":"Ross Island & North Bay","desc":"Glass bottom boat ride to see corals. Historical tour of Ross Island."},{"day":3,"title":"Havelock Island","desc":"Ferry to Havelock. Family time at Radhanagar beach."},{"day":4,"title":"Elephant Beach","desc":"Safe snorkeling and water sports for the family at Elephant Beach."},{"day":5,"title":"Return to Port Blair","desc":"Souvenir shopping and visit to Samudrika Marine Museum."},{"day":6,"title":"Departure","desc":"Airport drop."}]'
      ) ON CONFLICT(id) DO UPDATE SET title=excluded.title;
INSERT INTO packages (id, title, duration, basePrice, priceSuffix, image, badge, badgeColor, desc, destinations, inclusions, itinerary) VALUES (
        'p3', 
        'Premium Island Luxury Tour', 
        '6 Nights / 7 Days', 
        34556, 
        '/person', 
        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800', 
        'Most Popular', 
        'bg-champagne', 
        'The ultimate Andaman experience. VIP transfers, premium stays, and exclusive island tours.', 
        '["Port Blair","Havelock","Neil","Baratang"]', 
        '["Premium Room","Makruzz VIP Ferry","Private Cab","Scuba Diving","Limestone Caves","All Meals"]', 
        '[{"day":1,"title":"VIP Arrival","desc":"Welcome drinks, check-in. Evening at Corbyn's Cove beach."},{"day":2,"title":"Baratang Island","desc":"Early morning trip through Jarawa reserve to Limestone Caves."},{"day":3,"title":"Havelock Island","desc":"VIP ferry to Havelock. Sunset at Radhanagar Beach."},{"day":4,"title":"Scuba Experience","desc":"Introductory scuba diving with PADI certified instructors."},{"day":5,"title":"Neil Island","desc":"Ferry to Neil Island. Relax at Bharatpur beach."},{"day":6,"title":"Port Blair Heritage","desc":"Return to Port Blair. City tour and shopping."},{"day":7,"title":"Departure","desc":"VIP airport transfer."}]'
      ) ON CONFLICT(id) DO UPDATE SET title=excluded.title;
INSERT INTO packages (id, title, duration, basePrice, priceSuffix, image, badge, badgeColor, desc, destinations, inclusions, itinerary) VALUES (
        'p4', 
        'Workation + Vacation Plan', 
        '14 Nights / 15 Days', 
        45000, 
        '/person', 
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800', 
        'Long Stay', 
        'bg-ocean-light', 
        'Work remotely with 100Mbps WiFi during the week, explore tropical paradise on the weekends.', 
        '["Port Blair Base","Weekend Islands"]', 
        '["Deluxe Room","100Mbps WiFi","Work Desk","Weekend Island Trips","Laundry","Breakfast"]', 
        '[{"day":"Mon-Fri","title":"Remote Work Setup","desc":"High-speed WiFi, dedicated workspace, endless coffee."},{"day":"Weekends","title":"Island Hopping","desc":"Guided weekend trips to Havelock, Neil, and Ross Islands."},{"day":"Anytime","title":"Local Exploration","desc":"Evening visits to local cafes and sunset points."}]'
      ) ON CONFLICT(id) DO UPDATE SET title=excluded.title;
INSERT INTO bookings (id, timestamp, status, type, name, phone, email, country, checkIn, checkOut, guests, roomType, addons, notes) VALUES (
        'AHL-358362', 
        '2026-04-25T02:32:38.362Z', 
        'Pending', 
        'Room Booking', 
        'hhh', 
        '9999', 
        'savinayknair@gmail.com', 
        'India', 
        '2026-04-26', 
        '2026-04-29', 
        '2A, 0C', 
        'Deluxe Family Comfort Room', 
        'Music System, Candlelight Dinner, Airport Pickup, Airport Drop', 
        'hiii'
      ) ON CONFLICT(id) DO NOTHING;
INSERT INTO bookings (id, timestamp, status, type, name, phone, email, country, checkIn, checkOut, guests, roomType, addons, notes) VALUES (
        'AHL-053054', 
        '2026-04-24T13:24:13.054Z', 
        'Pending', 
        'Room Booking', 
        'Savinay K', 
        '9778230231', 
        'savinayknair@gmail.com', 
        'India', 
        '2026-04-24', 
        '2026-04-28', 
        '2A, 2C', 
        'Deluxe Premium Stay Room', 
        '🚗 Airport Pickup, 🚕 Airport Drop, ⛴️ Ferry Assistance', 
        'Veg Food'
      ) ON CONFLICT(id) DO NOTHING;
INSERT INTO bookings (id, timestamp, status, type, name, phone, email, country, checkIn, checkOut, guests, roomType, addons, notes) VALUES (
        'AHL-034342', 
        '2026-04-24T13:23:54.342Z', 
        'Pending', 
        'Room Booking', 
        'Savinay K', 
        '9778230231', 
        'savinayknair@gmail.com', 
        'India', 
        '2026-04-24', 
        '2026-04-28', 
        '2A, 2C', 
        'Deluxe Premium Stay Room', 
        '🚗 Airport Pickup, 🚕 Airport Drop, ⛴️ Ferry Assistance', 
        'Veg Food'
      ) ON CONFLICT(id) DO NOTHING;
INSERT INTO bookings (id, timestamp, status, type, name, phone, email, country, checkIn, checkOut, guests, roomType, addons, notes) VALUES (
        'AHL-892337', 
        '2026-04-24T13:21:32.337Z', 
        'Pending', 
        'General Inquiry', 
        'llll', 
        '00000', 
        'N/A', 
        'India', 
        '10 mar', 
        'N/A', 
        '2', 
        'Stay', 
        '', 
        '.....'
      ) ON CONFLICT(id) DO NOTHING;
INSERT INTO bookings (id, timestamp, status, type, name, phone, email, country, checkIn, checkOut, guests, roomType, addons, notes) VALUES (
        'AHL-215728', 
        '2026-04-24T13:10:15.728Z', 
        'Pending', 
        'General Inquiry', 
        'Test User', 
        '9999911111', 
        'N/A', 
        'India', 
        '1-10 May 20261-10 May 2026Test booking ', 
        'N/A', 
        '2', 
        'Stay', 
        '', 
        'Test booking request.request.'
      ) ON CONFLICT(id) DO NOTHING;
INSERT INTO bookings (id, timestamp, status, type, name, phone, email, country, checkIn, checkOut, guests, roomType, addons, notes) VALUES (
        'AHL-039122', 
        '2026-04-24T13:07:19.122Z', 
        'Pending', 
        'General Inquiry', 
        'Test User', 
        '9999911111', 
        'N/A', 
        'India', 
        '1-10 May 20261-10 May 2026Test booking ', 
        'N/A', 
        '2', 
        'Stay', 
        '', 
        'Test booking request.request.'
      ) ON CONFLICT(id) DO NOTHING;
INSERT INTO bookings (id, timestamp, status, type, name, phone, email, country, checkIn, checkOut, guests, roomType, addons, notes) VALUES (
        'AHL-469506', 
        '2026-04-24T12:24:29.506Z', 
        'Pending', 
        'General Inquiry', 
        'gggg', 
        '00000', 
        'N/A', 
        'India', 
        '55', 
        'N/A', 
        '2', 
        'Stay', 
        '', 
        ''
      ) ON CONFLICT(id) DO NOTHING;
INSERT INTO bookings (id, timestamp, status, type, name, phone, email, country, checkIn, checkOut, guests, roomType, addons, notes) VALUES (
        'AHL-283766', 
        '2026-04-24T12:21:23.766Z', 
        'Pending', 
        'General Inquiry', 
        'Test Guest', 
        '9999911111', 
        'N/A', 
        'India', 
        '12-14 Apr', 
        'N/A', 
        '2', 
        'Stay', 
        '', 
        ''
      ) ON CONFLICT(id) DO NOTHING;
INSERT INTO bookings (id, timestamp, status, type, name, phone, email, country, checkIn, checkOut, guests, roomType, addons, notes) VALUES (
        'AHL-882445', 
        '2026-04-24T12:14:42.445Z', 
        'Pending', 
        'General Inquiry', 
        'ddbeaduefw', 
        '677877888', 
        'N/A', 
        'India', 
        '15-21', 
        'N/A', 
        '2', 
        'Stay', 
        '', 
        ''
      ) ON CONFLICT(id) DO NOTHING;
INSERT INTO bookings (id, timestamp, status, type, name, phone, email, country, checkIn, checkOut, guests, roomType, addons, notes) VALUES (
        'AHL-358876', 
        '2026-04-24T12:05:58.876Z', 
        'Completed', 
        'General Inquiry', 
        'sss', 
        '11111', 
        'N/A', 
        'India', 
        '12-14 apr', 
        'N/A', 
        '2', 
        'Stay', 
        '', 
        '.....'
      ) ON CONFLICT(id) DO NOTHING;
INSERT INTO bookings (id, timestamp, status, type, name, phone, email, country, checkIn, checkOut, guests, roomType, addons, notes) VALUES (
        'AHL-026206', 
        '2026-04-24T12:00:26.206Z', 
        'Pending', 
        'General Inquiry', 
        'sss', 
        '11111', 
        'N/A', 
        'India', 
        '12-14 apr', 
        'N/A', 
        '2', 
        'Stay', 
        '', 
        '.....'
      ) ON CONFLICT(id) DO NOTHING;
INSERT INTO bookings (id, timestamp, status, type, name, phone, email, country, checkIn, checkOut, guests, roomType, addons, notes) VALUES (
        'AHL-658083', 
        '2026-04-24T11:54:18.083Z', 
        'Pending', 
        'Package Booking', 
        'Savinay', 
        '000000000', 
        'ljnjknk', 
        'India', 
        '2026-04-24', 
        'N/A', 
        '2A, 0C', 
        '3N/4D', 
        '🐠 Snorkeling, 🪂 Parasailing, 🍽️ Candlelight Dinner', 
        'that''s all'
      ) ON CONFLICT(id) DO NOTHING;
INSERT INTO bookings (id, timestamp, status, type, name, phone, email, country, checkIn, checkOut, guests, roomType, addons, notes) VALUES (
        'AHL-469016', 
        '2026-04-24T11:51:09.016Z', 
        'Rejected', 
        'General Inquiry', 
        'Savinay', 
        '0000000000', 
        'N/A', 
        'India', 
        '10 20', 
        'N/A', 
        '2', 
        'Stay', 
        '', 
        '...'
      ) ON CONFLICT(id) DO NOTHING;
INSERT INTO bookings (id, timestamp, status, type, name, phone, email, country, checkIn, checkOut, guests, roomType, addons, notes) VALUES (
        'AHL-465472', 
        '2026-04-24T11:51:05.472Z', 
        'Confirmed', 
        'General Inquiry', 
        'Savinay', 
        '0000000000', 
        'N/A', 
        'India', 
        '10 20', 
        'N/A', 
        '2', 
        'Stay', 
        '', 
        '...'
      ) ON CONFLICT(id) DO NOTHING;
INSERT INTO bookings (id, timestamp, status, type, name, phone, email, country, checkIn, checkOut, guests, roomType, addons, notes) VALUES (
        'AHL-440655', 
        '2026-04-24T11:50:40.655Z', 
        'Completed', 
        'General Inquiry', 
        'Savinay', 
        '0000000000', 
        'N/A', 
        'India', 
        '10 20', 
        'N/A', 
        '2', 
        'Stay', 
        '', 
        '...'
      ) ON CONFLICT(id) DO NOTHING;
INSERT INTO settings (key, value) VALUES ('addonPrices', '{"Airport Pickup":800,"Airport Drop":800,"Honeymoon Decoration":1500,"Anniversary Decoration":1500,"Extra Mattress":700,"Candlelight Setup":2000,"Breakfast Upgrade":300,"Scuba Diving":3500,"Snorkeling":1000,"Parasailing":3000,"Candlelight Dinner":2500,"Photography":5000,"Private Cab":2500,"Island Guide":1000,"Music System":1000}') ON CONFLICT(key) DO UPDATE SET value=excluded.value;
INSERT INTO settings (key, value) VALUES ('hourlyRate', '166') ON CONFLICT(key) DO UPDATE SET value=excluded.value;
INSERT INTO settings (key, value) VALUES ('taxes', '0') ON CONFLICT(key) DO UPDATE SET value=excluded.value;
INSERT INTO settings (key, value) VALUES ('seasonalRateMultiplier', '1') ON CONFLICT(key) DO UPDATE SET value=excluded.value;
