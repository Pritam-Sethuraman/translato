"use client";

import { ChatMembers, chatMembersRef } from "@/lib/converters/chat-members";
import useAdminId from "@/lib/hooks/use-admin-id";
import { Loader2 } from "lucide-react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Badge } from "@ui/badge";
import UserAvatar from "./user-avatar";

type Props = { chatId: string };

function ChatMembersBadges({ chatId }: Props) {
  const [members, loading, error] = useCollectionData<ChatMembers>(
    chatMembersRef(chatId)
  );

  const adminId = useAdminId({ chatId });

  if (loading && !members) return <Loader2 className="animate-spin" />;

  return (
    !loading && (
      <div className="border p-2 rounded-xl m-5">
        <div className="flex flex-wrap gap-2 p-2 justify-center items-center md:justify-start">
          {members?.map((member) => (
            <Badge
              key={member.email}
              variant="secondary"
              className="flex space-x-2 h-14 p-5 pl-2 pr-5"
            >
              <div className="flex items-center space-x-2">
                <UserAvatar name={member.email} image={member.image} />
              </div>

              <div className="italic">
                <p>{member.email}</p>
                {member.userId === adminId && (
                  <p className="text-indigo-400 animate-pulse">Admin</p>
                )}
              </div>
            </Badge>
          ))}
        </div>
      </div>
    )
  );
}

export default ChatMembersBadges;
