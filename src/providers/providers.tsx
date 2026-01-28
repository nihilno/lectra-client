import { Toaster } from "@/components/refine-ui/notification/toaster";
import { ThemeProvider } from "@/components/refine-ui/theme/theme-provider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <Toaster />
    </ThemeProvider>
  );
}

export default Providers;
