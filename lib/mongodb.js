import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
	throw new Error('Add Mongo URI to .env.local');
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri);  // no options needed here
		global._mongoClientPromise = client.connect();
	}
	clientPromise = global._mongoClientPromise;
} else {
	client = new MongoClient(uri);
	clientPromise = client.connect();
}

export default clientPromise;
