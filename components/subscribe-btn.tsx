"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getStripe } from "@/lib/stripe-client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const SubscribeButton = ({ price }: { price: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleCheckout = async (price: string) => {
    try {
      setLoading(true);
      const response = await fetch("/api/stripe/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }),
      });
      if (!response.ok) {
        const { error } = await response.json();
        setError(error);
        return;
      }
      const { sessionId } = await response.json();
      const stripe = await getStripe();
      if (stripe) {
        stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong...!!!.Please try again later");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Button
      onClick={() => handleCheckout(price)}
      className="bg-indigo-700"
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </>
      ) : (
        "Subscribe"
      )}
    </Button>
  );
};

export default SubscribeButton;
