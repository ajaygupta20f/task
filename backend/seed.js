import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const db = mongoose.connection.db;
    const collection = db.collection("configurations");

    await collection.insertOne({
      configurationId: "qwertyuiop",
      matrix: [
        ["sym1", "sym2", "sym3"],
        ["sym4", "sym6", "sym8"],
        ["sym5", "sym1", "sym0"]
      ],
      remark: "initial remark"
    });

    console.log("✅ Test document inserted into 'merntasks.configurations'");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
