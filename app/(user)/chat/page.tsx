import ChatList from "@/components/chat-list";

type Props = {
  params: {};
  searchParams: {
    error: string;
  };
};

function ChatsPage({}: Props) {
  return (
    <div>
      <ChatList />
    </div>
  );
}

export default ChatsPage;
