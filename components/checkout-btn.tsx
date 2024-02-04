"use client";

import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";

function CheckoutButton() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const createCheckoutSession = async () => {
    if (!session?.user.id) return;
    // push a doc to firebase db
    setLoading(true);

    const docRef = await addDoc(
      collection(db, "customers", session.user.id, "checkout_sessions"),
      {
        price: "price_asdklnvrui",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    // ... stripe extention on firebase will create a checkout  session
    // redirect user to checkout page
  };

  return (
    <div className="flex felx-col space-y2">
      {/* If subscribed show me the user is subscribed */}
      <button
        onClick={() => createCheckoutSession()}
        className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80"
      >
        Sign Up
      </button>
    </div>
  );
}

export default CheckoutButton;
