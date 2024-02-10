"use client";

import { db } from "@/firebase";
import { useSubscriptionStore } from "@/store/store";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ManageAccountButton from "@/components/manage-account-btn";

function CheckoutButton() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const subscription = useSubscriptionStore((state) => state.subscription);

  const isLoadingSubscription = subscription === undefined;

  const isSubscribed =
    subscription?.status === "active" && subscription?.role === "pro";

  const createCheckoutSession = async () => {
    if (!session) return;
    // push a doc to firebase db
    setLoading(true);

    const docRef = await addDoc(
      collection(db, "customers", session.user.id, "checkout_sessions"),
      {
        price: "price_1OEzf7DeyOaG1DwE9WsXTOMf",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    // ... stripe extention on firebase will create a checkout  session
    return onSnapshot(docRef, (snap) => {
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;

      if (error) {
        // Show error to customer
        // Check cloud function logs in the firebase console
        alert("An error occured:" + error.message);
        setLoading(false);
      }

      if (url) {
        // Let's redirect to the Stripe checkout url
        window.location.assign(url);
        setLoading(false);
      }
    });

    // redirect user to checkout page
  };

  return (
    <div className="flex felx-col space-y2">
      {/* If subscribed show me the user is subscribed */}
      <button className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80">
        {isSubscribed ? (
          <ManageAccountButton />
        ) : isLoadingSubscription || loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <button onClick={() => createCheckoutSession()}>Sign Up</button>
        )}
        {}
      </button>
    </div>
  );
}

export default CheckoutButton;
