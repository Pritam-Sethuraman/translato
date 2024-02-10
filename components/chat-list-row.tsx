"use client";

import { Skeleton } from "@ui/skeleton";
import { Message, limitedSortedMessagesRef } from "@/lib/converters/message";
import { useCollectionData } from "react-firebase-hooks/firestore";
import UserAvatar from "@/components/user-avatar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useLanguageStore } from "@/store/store";

type Props = {
  chatId: string;
};

function ChatListRow({ chatId }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [messages, loading, error] = useCollectionData<Message>(
    limitedSortedMessagesRef(chatId)
  );

  const language = useLanguageStore((state) => state.language);

  function prettyUUID(n = 4) {
    return chatId.substring(0, n);
  }

  const row = (message?: Message) => (
    <div
      key={chatId}
      onClick={() => router.push(`/chat/${chatId}`)}
      className="flex items-center p-5 space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700"
    >
      <UserAvatar
        name={message?.user.name || session?.user.name}
        image={message?.user.image || session?.user.image}
      />
      <div className="flex-1">
        <p className="font-bold">
          {!message && "New Chat"}
          {message &&
            [message?.user.name || session?.user.name].toString().split(" ")[0]}
        </p>

        <p>
          {message?.translated?.[language] || "Get the conversatin started..."}
        </p>
      </div>

      <div>
        <p>
          {message
            ? new Date(message.timestamp).toLocaleTimeString()
            : "No messages yet"}
        </p>
        <p className="">chat #{prettyUUID()}</p>
      </div>
    </div>
  );

  return (
    <div>
      {loading && (
        <div className="flex p-5 ietms-center space-x-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      )}

      {messages?.length === 0 && !loading && row()}

      {messages?.map((message) => row(message))}
    </div>
  );
}

export default ChatListRow;
