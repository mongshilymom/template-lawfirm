"use client";

import { useEffect, useState } from 'react';

export default function DebugBuild() {
  const [commitSha, setCommitSha] = useState<string>('');

  useEffect(() => {
    // Try to get commit SHA from environment variable
    const sha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
                process.env.VERCEL_GIT_COMMIT_SHA ||
                'dev-local';

    // Get first 7 characters for short SHA
    setCommitSha(sha.substring(0, 7));
  }, []);

  if (process.env.NODE_ENV === 'production' && !commitSha) {
    return null;
  }

  return (
    <div className="fixed bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-mono opacity-50 hover:opacity-100 transition-opacity">
      BUILD: {commitSha}
    </div>
  );
}