// src/app/(bare)/layout.tsx

import '@/app/globals.css'

export const metadata = {
  title: 'sheen.bot canvas | a smarter way to learn coding & robotics',
  description: 'sheen.bot is built on AWS to deliver a secure, scalable environment where students can learn coding and robotics efficiently. The platform integrates robotics kits with cloud services to enable remote coding and intuitive device control.',
  keywords: 'coding, robotics, kids learning, STEM education, cloud robotics, cloud coding, home school',
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function bareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    
  return (
    <html 
      lang="en" 
      className="text-body font-sans select-none"
    >
      <body className="h-screen flex flex-col">
        {children}
      </body>
    
    </html>
  );
}