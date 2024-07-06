require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

export const mongoURI = process.env.MONGO_URI;