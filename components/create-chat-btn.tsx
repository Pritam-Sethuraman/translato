"use client";

import { Button } from "@ui/button";
import { useToast } from "@ui/use-toast";
import { ToastAction } from "@ui/toast";
import { Loader2, MessageSquarePlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSubscriptionStore } from "@/store/store";
import { v4 as uuidv4 } from "uuid";
import {
  addChatRef,
  chatMembersCollectionGroupRef,
} from "@/lib/converters/chat-members";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";

type Props = {
  isLarge: boolean;
};

function CreateChatButton({ isLarge }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);

  const createNewChat = async () => {
    if (!session?.user.id) return;

    setLoading(true);
    toast({
      title: "Creating new chat...",
      description: "Hold tight while we create your new chat...",
      duration: 3000,
    });

    // TODO Check if user is pro and limit them creating a new chat
    const numberOfChats = (
      await getDocs(chatMembersCollectionGroupRef(session.user.id))
    ).docs.map((doc) => doc.data()).length;

    const isPro =
      subscription?.role === "pro" && subscription?.status === "active";

    if (!isPro && numberOfChats >= 3) {
      toast({
        title: "Free plan limit exceeded",
        description:
          "You've exceeded the limit of chats for the FREE plan. Please upgrade to PRO to continue adding users to chats!",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push("/register")}
          >
            Upgrade to PRO
          </ToastAction>
        ),
      });
    }
    const chatId = uuidv4();

    await setDoc(addChatRef(chatId, session.user.id), {
      userId: session.user.id,
      email: session.user.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session.user.image || "",
    })
      .then(() => {
        toast({
          title: "Success",
          description: "Your chat has been created!",
          className: "bg-green-600 text-white",
          duration: 2000,
        });
        router.push("/chat/" + chatId);
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "There was an error creating you chat!",
          variant: "destructive",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (isLarge) {
    return (
      <div>
        <Button variant={"default"} onClick={() => createNewChat()}>
          {loading ? <Loader2 className="animate-spin" /> : "Create a New Chat"}
        </Button>
      </div>
    );
  }

  return (
    <Button variant={"ghost"} onClick={() => createNewChat()}>
      <MessageSquarePlusIcon />
    </Button>
  );
}

export default CreateChatButton;
