// app/layout.tsx
'use client';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/sidebar';
import { SwitchDemo } from '@/components/dashboard/switch';
import './globals.css';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <SidebarProvider>
          <div className='flex min-h-screen w-full'>
            <AppSidebar />

            <div className='relative mb-2 ml-2 mr-2 mt-10 w-full flex-1'>
              <div className='fixed right-12 top-12'>
                <SwitchDemo />
              </div>

              <div className='absolute left-4 top-0 p-0'>
                <SidebarTrigger />
              </div>

              <div className='flex justify-center align-center'>{children}</div>
            </div>
            </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
