"use client";
import { useState } from "react";
import { getStripe } from "@/lib/stripe-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ManageSubscription = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const redirectToCustomerPortal = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/stripe/create-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const { error } = await response.json();
        setError(error);
        return;
      }
      const { url } = await response.json();
      router.push(url.url);
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
      onClick={redirectToCustomerPortal}
      className="bg-indigo-700"
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </>
      ) : (
        "Modify Your Subscription"
      )}
    </Button>
  );
};

export default ManageSubscription;
