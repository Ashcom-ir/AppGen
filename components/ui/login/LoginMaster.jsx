"use client";

export default function LoginMaster({ children }) {
  return (
    <main className="relative p-2 sm:p-4 flex items-center justify-center bg-black/6 backdrop-blur-2xl min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute animate-pulse delay-800 transition-all duration-2000 ease-in top-[-2%] left-[-2%] w-[120px] h-[120px] bg-blue-600 rounded-full mix-blend-screen blur-[110px] opacity-30" />
        <div className="absolute animate-pulse delay-800 transition-all duration-2000 ease-out bottom-[-2%] right-[-2%] w-[120px] h-[120px] bg-pink-600 rounded-full mix-blend-screen blur-[90px] opacity-25" />
      </div>
      <div className="absolute inset-0 backdrop-blur-2xl z-0" />
      {children}
    </main>
  );
}
