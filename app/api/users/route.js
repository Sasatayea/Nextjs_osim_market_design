import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    if (email) {
      const user = await db.collection("users").findOne({ email });

      if (!user) {
        return Response.json(
          { message: "user not found" },
          { status: 404 }
        );
      }

      return Response.json(user);
    }

    const users = await db.collection("users").find({}).toArray();

    return Response.json(users);
  } catch (error) {
    return Response.json(
      { message: "Error fetching users", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const usersCollection = db.collection("users");

    const result = await usersCollection.updateOne(
      { email: body.email },
      {
        $set: {
          name: body.name,
          email: body.email,
          image: body.image,
          emailVerified: body.emailVerified ?? false,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          id: body.id,
          createdAt: new Date(),
        },
      },
      { upsert: true },
    );

    return Response.json({
      message: "User saved successfully",
      data: result,
    });
  } catch (error) {
    return Response.json(
      { message: "Error", error: error.message },
      { status: 500 },
    );
  }
}
