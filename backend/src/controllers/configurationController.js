import mongoose from "mongoose";
function findFirst2DArray(obj) {
  const is2DArray = (val) =>
    Array.isArray(val) && val.every((row) => Array.isArray(row));
  for (const [key, value] of Object.entries(obj)) {
    if (is2DArray(value)) return value;
    if (value && typeof value === "object") {
      const nested = findFirst2DArray(value);
      if (nested) return nested;
    }
  }
  return null;
}
async function findConfigDoc(db, id) {
  const collection = db.collection("configurations");
  const byString = await collection.findOne({ configurationId: id });
  if (byString) return byString;
  if (mongoose.isValidObjectId(id)) {
    const byObjectId = await collection.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    if (byObjectId) return byObjectId;
  }
  const byIdField = await collection.findOne({ id });
  if (byIdField) return byIdField;
  return null;
}
export async function getInitialMatrix(req, res, next) {
  try {
    const { id } = req.params;
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not initialized");
    const doc = await findConfigDoc(db, id);
    if (!doc) return res.status(404).json({ message: "Configuration not found" });
    const matrix = findFirst2DArray(doc);
    if (!matrix)
      return res.status(404).json({ message: "No 2D array found in configuration" });
    return res.json(matrix);
  } catch (err) {
    next(err);
  }
}
export async function updateRemark(req, res, next) {
  try {
    const { id } = req.params;
    const { remark } = req.body || {};
    if (typeof remark !== "string" || remark.trim().length === 0) {
      return res.status(400).json({ message: "Invalid remark" });
    }
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not initialized");
    const collection = db.collection("configurations");
    let result = await collection.updateOne(
      { configurationId: id },
      { $set: { remark } }
    );
    if (result.matchedCount === 0 && mongoose.isValidObjectId(id)) {
      result = await collection.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: { remark } }
      );
    }
    if (result.matchedCount === 0) {
      result = await collection.updateOne({ id }, { $set: { remark } });
    }
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Configuration not found" });
    }
    return res.json({ message: "success" });
  } catch (err) {
    next(err);
  }
}
