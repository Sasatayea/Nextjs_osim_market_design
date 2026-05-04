import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;

  const db = client.db(process.env.DB_NAME); // mensClub
  const collection = db.collection("products");

  const data = await collection.find({}).toArray();

  return Response.json(data);
}

// ===== ADD PRODUCT =====
export async function POST(req) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const result = await db.collection("products").insertOne({
      ...body,
      createdAt: new Date(),
    });

    return Response.json({
      message: "Product created",
      data: result,
    });
  } catch (error) {
    return Response.json(
      { message: "Error", error: error.message },
      { status: 500 },
    );
  }
}
