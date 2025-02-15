// src/components/LoadingScreen.tsx

export default function LoadingScreen() {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin h-8 w-8 border-4 border-body border-t-transparent rounded-full"></div>
        <p className="text-base text-body">Loading...</p>
      </div>
    );
  }  