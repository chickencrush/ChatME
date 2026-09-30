import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 300);
          return 100;
        }
        return prev + 4;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center justify-center">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-ping"></div>
      </div>

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="text-7xl mb-4 animate-bounce">💬</div>
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">TeamChat</h1>
        <p className="text-white/80 text-sm mb-8">Aplikasi Chat Tim Kerja</p>

        {/* Progress bar */}
        <div className="w-48 h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-white/60 text-xs mt-3">
          {progress < 30 && 'Memuat data...'}
          {progress >= 30 && progress < 60 && 'Menghubungkan...'}
          {progress >= 60 && progress < 90 && 'Hampir siap...'}
          {progress >= 90 && 'Selamat datang!'}
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
