"use client";

import { subscriptionRef } from "@/lib/converters/subscriptions";
import { useSubscriptionStore } from "@/store/store";
import { onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

function SubscriptionProvider({ children }: Props) {
  const { data: session } = useSession();

  const setSubcription = useSubscriptionStore((state) => state.setSubscription);

  useEffect(() => {
    if (!session) return;

    return onSnapshot(
      subscriptionRef(session?.user.id),
      (snapshot) => {
        if (snapshot.empty) {
          console.log("User has no subscription");
          setSubcription(null);
        } else {
          console.log("User has Subscription");
          setSubcription(snapshot.docs[0].data());
        }
      },
      (error) => {
        console.error("Error getting document", error);
      }
    );
  }, [session, setSubcription]);

  return <div>{children}</div>;
}

export default SubscriptionProvider;
