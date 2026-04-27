import { Header } from "../components/main";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1 space-y-10 md:space-y-16 pt-5 pb-10 md:pb-16">
        {children}
      </main>
    </div>
  );
}
