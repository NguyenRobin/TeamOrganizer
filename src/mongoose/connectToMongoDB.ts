import mongoose from "mongoose";
declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// create one connection then use it everywhere instead of creating a connection everytime
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { connection: null, promise: null };
}

async function connectToMongoDB() {
  if (cached.connection) {
    // if we already is connected we want to return that connection
    return cached.connection;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    // cached.promise = await mongoose.connect(MONGODB_URI, opts);
    cached.promise = await mongoose.connect(MONGODB_URI, opts);
  }
  try {
    cached.connection = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
  return cached.connection;
}

export default connectToMongoDB;
