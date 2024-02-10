"use client";

import { ChatMembers, chatMembersRef } from "@/lib/converters/chat-members";
import useAdminId from "@/lib/hooks/use-admin-id";
import { Loader2 } from "lucide-react";
import { useCollectionData } from "react-firebase-hooks/firestore";

type Props = { chatId: string };

function ChatMembersBadges({ chatId }: Props) {
  const [members, loading, error] = useCollectionData<ChatMembers>(
    chatMembersRef(chatId)
  );

  const adminId = useAdminId({ chatId });

  if (loading && !members) return <Loader2 className="animate-spin" />;

  return <div>ChatMembersBadges</div>;
}

export default ChatMembersBadges;
