"use client";

import { Button } from "@/components/ui/button";
import { MessageSquarePlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

function CreateChatButton({}: Props) {
  const router = useRouter();

  const createNewChat = async () => {
    // All the logic here ....
    router.push("/chat/abc");
  };
  return (
    <Button onClick={() => createNewChat()} variant={"ghost"}>
      <MessageSquarePlusIcon />
    </Button>
  );
}

export default CreateChatButton;
