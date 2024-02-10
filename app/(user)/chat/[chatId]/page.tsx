import { authOptions } from "@/auth";
import ChatInput from "@/components/chat-input";
import { getServerSession } from "next-auth";

type Props = { params: { chatId: string } };

async function ChatPage({ params: { chatId } }: Props) {
  const session = await getServerSession(authOptions);

  return (
    <>
      {/* Admin Controls */}
      {/* ChatMembersBadge */}

      {/* Chat Messages */}

      {/* Chat */}
      <ChatInput chatId={chatId} />
    </>
  );
}

export default ChatPage;
