// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function POST(req) {
//   const body = await req.json();
//   const { cart } = body;

//   const line_items = cart.map((item) => ({
//     price_data: {
//       currency: "usd",
//       product_data: { name: item.name },
//       unit_amount: Math.round(item.price * 100),
//     },
//     quantity: item.qty,
//   }));

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items,
//     mode: "payment",
//     success_url: "http://localhost:3000/success",
//     cancel_url: "http://localhost:3000",
//   });

//   return Response.json({ url: session.url });
// }


import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { cart } = body;

    if (!cart || !Array.isArray(cart)) {
      return Response.json(
        { message: "Invalid cart" },
        { status: 400 }
      );
    }

    const line_items = cart.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product_name || "Product",
          images: item.primary_image_url ? [item.primary_image_url] : [],
        },
        unit_amount: Math.round(Number(item.sale_price || 0) * 100),
      },
      quantity: item.qty || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000",
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);

    return Response.json(
      { message: "Checkout failed", error: error.message },
      { status: 500 }
    );
  }
}