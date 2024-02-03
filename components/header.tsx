import { authOptions } from "@/auth";
import Logo from "@/components/logo";
import ThemeToggle from "@/components/theme-toggle";
import UserButton from "@/components/user-btn";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { MessagesSquare } from "lucide-react";
import CreateChatButton from "@/components/create-chat-btn";

async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <nav className="flex flex-col sm:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
        <Logo />
        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Lang Select */}

          {session ? (
            <>
              <Link href={"/chat"} prefetch={false}>
                <MessagesSquare className="text-black dark:text-white" />
              </Link>
              <CreateChatButton />
            </>
          ) : (
            <Link href="/pricing" prefetch={true}>
              Pricing
            </Link>
          )}

          <ThemeToggle />
          <UserButton session={session} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
