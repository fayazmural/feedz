import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
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
    const url = await stripe.billingPortal.sessions.create({
        customer : customer?.id || '',
        return_url : `${baseUrl}/payments`
    })
    return Response.json({ url }, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to create portal" },
      { status: 500 }
    );
  }
}
