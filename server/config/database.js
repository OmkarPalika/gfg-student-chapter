// config/database.mjs
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), 'server', '.env') });

const mongoURI = process.env.MONGO_URI;
export { mongoURI };
