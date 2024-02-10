import { authOptions } from "@/auth";
import ChatInput from "@/components/chat-input";
import ChatMembersBadges from "@/components/chat-members-badges";
import ChatMessages from "@/components/chat-messages";
import { sortedMessagesRef } from "@/lib/converters/message";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";

type Props = { params: { chatId: string } };

async function ChatPage({ params: { chatId } }: Props) {
  const session = await getServerSession(authOptions);

  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  );

  return (
    <>
      {/* Admin Controls */}
      {/* ChatMembersBadge */}
      <ChatMembersBadges chatId={chatId} />

      <div className="flex-1">
        <ChatMessages
          chatId={chatId}
          session={session}
          initialMessages={initialMessages}
        />
      </div>
      <ChatInput chatId={chatId} />
    </>
  );
}

export default ChatPage;
