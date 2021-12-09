import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const method = req.method;
  let response;
  switch (method) {
    case "GET":
      response = await db.collection("participants").find({}).toArray();
      break;
    case "POST":
      response = await db.collection("participants").insertOne(req.body);
      break;

    default:
      break;
  }

  res.json(response);
};
