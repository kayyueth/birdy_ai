'use client';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { SwitchMode } from '@/components/features/dashboard/switch';
import { AppSidebar } from '@/components/features/dashboard/sidebar';
import { ThemeProvider, useTheme } from '@/app/context/theme';
import './globals.css';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ThemeProvider>
          <RootContent>{children}</RootContent>
        </ThemeProvider>
      </body>
    </html>
  );
}

function RootContent({ children }: { children: React.ReactNode }) {
  const { isNightMode, toggleTheme } = useTheme();

  return (
    <SidebarProvider>
      <div className='flex min-h-screen w-full'>
        <AppSidebar isNightMode={isNightMode} />

        <div className='flex flex-1 flex-col justify-center'>
          {/* sidebar trigger and darkmode trigger */}
          <div className='sticky top-0 flex flex-row items-center justify-between bg-white z-50 dark:bg-black'>
            <div className='ml-7 mt-5 mb-3'>
              <SidebarTrigger />
            </div>
            <div className='mr-7 mt-5 mb-3'>
              <SwitchMode
                isNightMode={isNightMode}
                onThemeToggle={toggleTheme}
              />
            </div>
          </div>
          {/* children component */}
          <div className='mt-5 flex items-start justify-center'>{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
