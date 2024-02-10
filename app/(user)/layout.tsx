export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1 w-full max-w-6xl mx-auto">
      {children}
    </div>
  );
}
