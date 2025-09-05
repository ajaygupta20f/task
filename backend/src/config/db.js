import mongoose from 'mongoose';
export async function connectDB() {
const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('Missing MONGODB_URI in env');
mongoose.set('strictQuery', false);
await mongoose.connect(uri, {
});
console.log('Connected to MongoDB');
}