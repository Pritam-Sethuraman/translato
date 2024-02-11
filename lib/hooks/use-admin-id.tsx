"use client";

import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { chatMemberAdminRef } from "../converters/chat-members";

type Props = { chatId: string };

function useAdminId({ chatId }: Props) {
  const [adminId, setAdminId] = useState<string>("");
  useEffect(() => {
    const fetchAdminStatus = async () => {
      const adminId = (await getDocs(chatMemberAdminRef(chatId))).docs.map(
        (doc) => doc.id
      )[0];

      setAdminId(adminId);
    };

    fetchAdminStatus();
  }, [chatId]);

  return adminId;
}

export default useAdminId;
