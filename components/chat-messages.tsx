"use client";

import { Message, sortedMessagesRef } from "@/lib/converters/message";
import { Session } from "next-auth";
import { useLanguageStore } from "@/store/store";
import { createRef, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { MessageCircleIcon } from "lucide-react";

type Props = {
  chatId: string;
  initialMessages: Message[];
  session: Session | null;
};

function ChatMessages({ chatId, initialMessages, session }: Props) {
  const language = useLanguageStore((state) => state.language);
  const messagesEndRef = createRef<HTMLDivElement>();

  const [messages, loading, error] = useCollectionData<Message>(
    sortedMessagesRef(chatId),
    {
      initialValue: initialMessages,
    }
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messagesEndRef]);

  return (
    <div>
      {!loading && messages?.length === 0 && (
        <div className="flex flex-col justify-center items-center p-10 rounded-xl space-y-2 bg-indigo-400 text-white font-extralight">
          <MessageCircleIcon className="h-10 w-10" />
          <h2>
            <span className="font-bold">Invite a friend</span> &{" "}
            <span className="font-bold">
              Send your first message in ANY language
            </span>{" "}
            below to get started!
          </h2>
          <p>The AI will auto-detect & trasnlate it all for you</p>
        </div>
      )}
    </div>
  );
}

export default ChatMessages;
