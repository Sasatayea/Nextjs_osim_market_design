import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// ===== GET SINGLE =====
export async function GET(req, { params }) {
  try {
    const { id } = await params;
    // console.log("the id "+id)

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const product = await db.collection("products").findOne({
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


// ===== UPDATE =====
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const { _id, ...rest } = body;

    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: rest,
      }
    );

    console.log("UPDATE RESULT:", result);

    return Response.json({
      message: "Product updated",
      result,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}

// ===== DELETE =====
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const result = await db.collection("products").deleteOne({
      _id: new ObjectId(id),
    });

    return Response.json({
      message: "Product deleted",
      data: result,
    });
  } catch (error) {
    return Response.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}