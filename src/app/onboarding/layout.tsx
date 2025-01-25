import '@/app/globals.css'

export default function onboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en" className="text-body font-sans select-none">
      <body className="h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}