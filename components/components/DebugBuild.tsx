'use client';

import { useState, useEffect } from 'react';

interface BuildInfo {
  buildTime: string;
  nodeEnv: string;
  nextVersion: string;
  commitHash: string;
}

export default function DebugBuild() {
  const [buildInfo, setBuildInfo] = useState<BuildInfo | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 빌드 정보 수집
    setBuildInfo({
      buildTime: new Date().toISOString(),
      nodeEnv: process.env.NODE_ENV || 'development',
      nextVersion: process.env.NEXT_RUNTIME || 'nodejs',
      commitHash: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'local'
    });

    // URL 파라미터에서 debug 모드 확인
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setIsVisible(params.has('debug') || localStorage.getItem('debug-mode') === 'true');
    }
  }, []);

  const toggleDebugMode = () => {
    const newState = !isVisible;
    setIsVisible(newState);
    if (typeof window !== 'undefined') {
      if (newState) {
        localStorage.setItem('debug-mode', 'true');
      } else {
        localStorage.removeItem('debug-mode');
      }
    }
  };

  if (!buildInfo) return null;

  return (
    <>
      {/* Debug Toggle Button - 고정 위치 */}
      <button
        onClick={toggleDebugMode}
        className="fixed bottom-4 right-4 z-50 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-20 hover:opacity-100 transition-opacity"
        title="Toggle Debug Info"
      >
        DEBUG
      </button>

      {/* Debug Info Panel */}
      {isVisible && (
        <div className="fixed bottom-16 right-4 z-40 bg-black/90 text-green-400 text-xs p-4 rounded shadow-lg max-w-sm font-mono">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-yellow-400 font-semibold">🚧 Build Info</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-red-400 hover:text-red-300"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1">
            <div>
              <span className="text-gray-400">Environment:</span>
              <span className={buildInfo.nodeEnv === 'production' ? 'text-green-400' : 'text-orange-400'}>
                {buildInfo.nodeEnv}
              </span>
            </div>

            <div>
              <span className="text-gray-400">Runtime:</span>
              <span className="text-blue-400">{buildInfo.nextVersion}</span>
            </div>

            <div>
              <span className="text-gray-400">Commit:</span>
              <span className="text-purple-400">{buildInfo.commitHash}</span>
            </div>

            <div>
              <span className="text-gray-400">Build:</span>
              <span className="text-cyan-400">
                {new Date(buildInfo.buildTime).toLocaleString()}
              </span>
            </div>
          </div>

          {/* 추가 디버그 정보 */}
          <div className="mt-3 pt-2 border-t border-gray-600">
            <div className="text-gray-400 text-xs">
              Window: {typeof window !== 'undefined' ? window.innerWidth : 'SSR'}x
              {typeof window !== 'undefined' ? window.innerHeight : 'SSR'}
            </div>
            <div className="text-gray-400 text-xs">
              User Agent: {typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 30) + '...' : 'SSR'}
            </div>
          </div>
        </div>
      )}
    </>
  );
}