import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { price, quantity = 1 } = await req.json();
  const { userId } = auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userSubscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, userId),
  });
  let customer;
  if (userSubscription) {
    customer = {
      id: userSubscription.stripeCustomerId,
    };
  } else {
    const customerData = {
      metadata: {
        dbId: userId,
      },
    };
    const response = await stripe.customers.create(customerData);
    customer = { id: response.id };
    await db.insert(subscriptions).values({
      userId,
      stripeCustomerId: customer.id,
    });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `${baseUrl}/payments/checkout-success`,
      customer: customer.id || undefined,
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price,
          quantity,
        },
      ],
    });
    return Response.json({ sessionId: session.id }, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}
