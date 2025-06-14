
import MainSectionsLayout from "@/components/MainSectionsLayout";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <header className="py-6 px-8 border-b border-border mb-2 bg-card shadow-sm w-full">
        <h1 className="text-3xl font-extrabold tracking-tight text-primary">IntelliDose</h1>
      </header>
      <main className="flex-1 flex flex-col w-full">
        <MainSectionsLayout />
      </main>
      {/* Optional: footer */}
      <footer className="w-full text-right text-xs text-muted-foreground pr-8 pb-4 select-none">
        &copy; {new Date().getFullYear()} IntelliDose
      </footer>
    </div>
  );
};

export default Index;
