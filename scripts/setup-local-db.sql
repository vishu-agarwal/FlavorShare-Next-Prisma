-- Local PostgreSQL setup script
-- Run this script to set up your local database

-- Connect to PostgreSQL as superuser first:
-- psql -U postgres

-- Create the database
CREATE DATABASE flavorshare;

-- Create a dedicated user (optional - you can also use the default postgres user)
CREATE USER flavorshare_user WITH PASSWORD 'password';

-- Grant privileges to the user
GRANT ALL PRIVILEGES ON DATABASE flavorshare TO flavorshare_user;

-- Connect to the flavorshare database
\c flavorshare;

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO flavorshare_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO flavorshare_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO flavorshare_user;

-- Display success message
SELECT 'Database setup completed successfully!' as status;

-- Show database info
\l flavorshare
