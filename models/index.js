import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { isLocal } from '../localOnly/localOnly.js';

dotenv.config();

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;

export { db };
