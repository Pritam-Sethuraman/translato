"use client";

import { z } from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubscriptionStore } from "@/store/store";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { useToast } from "@ui/use-toast";
import { ToastAction } from "@ui/toast";
import { Form, FormControl, FormField, FormItem } from "@ui/form";
import { addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import {
  limitedMessagesRef,
  messagesRef,
  User,
} from "@/lib/converters/message";

const formSchema = z.object({
  input: z.string().max(100),
});

type Props = { chatId: string };

function ChatInput({ chatId }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const temporaryValue = values.input.trim();
    form.reset();
    if (temporaryValue.length === 0) {
      return;
    }

    if (!session?.user) {
      return;
    }

    // Check if user is pro and limit them creating a new chat
    const messages = (await getDocs(limitedMessagesRef(chatId))).docs.map(
      (doc) => doc.data()
    ).length;

    const isPro =
      subscription?.role === "pro" && subscription?.status === "active";

    if (!isPro && messages >= 20) {
      toast({
        title: "Free plan limit exceeded!",
        description:
          "You've exceeded the FREE plan limit of 20 messages per chat. Upgrade to PRO form unlimited chatting",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push("/register")}
          >
            Upgrade to PRO
          </ToastAction>
        ),
      });
      return;
    }

    const userToStore: User = {
      id: session.user.id!,
      name: session.user.name!,
      email: session.user.email!,
      image: session.user.image || "",
    };

    addDoc(messagesRef(chatId), {
      input: temporaryValue,
      timestamp: serverTimestamp(),
      user: userToStore,
    });
  }

  return (
    <div className="sticky bottom-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex mx-auto space-x-2 p-2 rounded-t-xl max-w-4xl bg-white border dark:bg-slate-800"
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    className="border-none bg-transparent dark:placeholder:text-white/70"
                    placeholder="Enter message in ANY language..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-violet-600 text-white">
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ChatInput;
