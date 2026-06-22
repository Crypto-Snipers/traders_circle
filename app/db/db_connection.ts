import { MongoClient, Db, MongoClientOptions, Collection } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://visheshpurkait_db_user:yp4SwEHZyd0zWDq3@ang.z2paixr.mongodb.net/?appName=ANG';
const DB_NAME = 'ang';

interface CachedDb {
  client: MongoClient;
  db: Db;
  tradersMarathon: Collection;
  payments: Collection;
}

let cachedDb: CachedDb | null = null;

export async function connectToDatabase(): Promise<CachedDb> {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(MONGO_URI, {
    // These options are now the default in MongoDB Node.js Driver v4+
  } as MongoClientOptions);

  const db = client.db(DB_NAME);

  cachedDb = {
    client,
    db,
    tradersMarathon: db.collection('tradersMarathon'),
    payments: db.collection('payments'),
  };

  return cachedDb;
}
