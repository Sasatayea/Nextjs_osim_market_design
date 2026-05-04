import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// ===== GET SINGLE =====
export async function GET(req, { params }) {
  try {
    const { id } = await params;
    console.log("the id "+id)

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const product = await db.collection("users").findOne({
       _id: new ObjectId(id),
    });

    if (!product) {
      return Response.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return Response.json(product);
  } catch (error) {
    return Response.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}
