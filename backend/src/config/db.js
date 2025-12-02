import mongoose from "mongoose";

// Optional legacy index helper from previous project – safe to keep but unused here.
const ensureBoxCodeIndex = async (connection) => {
  try {
    const collection = connection.db.collection("boxes");
    const indexes = await collection.indexes();
    const codeIndex = indexes.find((idx) => idx.name === "code_1");
    if (codeIndex?.unique) {
      await collection.dropIndex("code_1");
      await collection.createIndex({ code: 1 });
      console.log(
        "Dropped unique index on boxes.code and recreated as non-unique."
      );
    } else if (!codeIndex) {
      await collection.createIndex({ code: 1 });
      console.log("Created index on boxes.code.");
    }
  } catch (err) {
    if (err.codeName !== "IndexNotFound") {
      console.warn("Warning ensuring boxes.code index:", err.message || err);
    }
  }
};

const buildMongoConfig = () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error(
      "MONGO_URI is not set. Please define it in your .env as mongodb://... or mongodb+srv://..."
    );
  }

  if (uri.startsWith("https://")) {
    throw new Error(
      "MONGO_URI must start with mongodb:// or mongodb+srv://, not https:// (you likely pasted a HTTP URL instead of a Mongo connection string)."
    );
  }

  const isSrv = uri.startsWith("mongodb+srv://");

  // For local MongoDB (mongodb://) we explicitly disable TLS/SSL to avoid
  // TLS handshake issues. For cloud/SRV we let the driver decide.
  const options = isSrv
    ? {}
    : {
        ssl: false,
        tls: false,
      };

  return { uri, options };
};

const connectDB = async () => {
  try {
    const { uri, options } = buildMongoConfig();

    const conn = await mongoose.connect(uri, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Safe no-op for this project; kept for backward compatibility
    await ensureBoxCodeIndex(conn.connection);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.error(
      "Check that MONGO_URI uses mongodb:// or mongodb+srv:// and that your MongoDB server is reachable."
    );
    process.exit(1);
  }
};

export default connectDB;
