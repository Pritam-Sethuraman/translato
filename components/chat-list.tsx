import { authOptions } from "@/auth";
import { chatMembersCollectionGroupRef } from "@/lib/converters/chat-members";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import ChatListRows from "@/components/chat-list-rows";

async function ChatList() {
  const session = await getServerSession(authOptions);

  const chatSnapshot = await getDocs(
    chatMembersCollectionGroupRef(session?.user.id!)
  );

  const initialChats = chatSnapshot.docs.map((doc) => ({
    ...doc.data(),
    timestamp: null,
  }));

  return <ChatListRows initialChats={initialChats} />;
}

export default ChatList;
