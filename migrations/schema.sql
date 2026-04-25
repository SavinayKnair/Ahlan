-- Ahlan Homestays D1 Schema

-- Rooms Table
CREATE TABLE IF NOT EXISTS rooms (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    size TEXT,
    guests TEXT,
    basePrice INTEGER,
    image TEXT,
    desc TEXT,
    features TEXT, -- JSON array
    tag TEXT,
    tagColor TEXT,
    availability TEXT
);

-- Packages Table
CREATE TABLE IF NOT EXISTS packages (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    duration TEXT,
    basePrice INTEGER,
    priceSuffix TEXT,
    image TEXT,
    badge TEXT,
    badgeColor TEXT,
    desc TEXT,
    destinations TEXT, -- JSON array
    inclusions TEXT, -- JSON array
    itinerary TEXT -- JSON array of objects
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'Pending',
    type TEXT,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    country TEXT,
    checkIn TEXT,
    checkOut TEXT,
    guests TEXT,
    roomType TEXT,
    addons TEXT,
    notes TEXT
);

-- Settings Table (Key-Value)
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT -- Can store numbers or JSON strings
);
