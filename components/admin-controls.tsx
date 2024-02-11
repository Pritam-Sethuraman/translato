"use client";

import InviteUser from "@/components/invite-user";
import DeleteChatButton from "@/components/delete-chat-btn";

type Props = { chatId: string };

function AdminControls({ chatId }: Props) {
  return (
    <div className="flex justify-end space-x-2 m-5 mb-8">
      <InviteUser chatId={chatId} />
      <DeleteChatButton chatId={chatId} />
    </div>
  );
}

export default AdminControls;
