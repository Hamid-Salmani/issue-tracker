import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingIssueDetailPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white/60 backdrop-blur-xl border border-white/30 rounded-3xl p-8 md:p-10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] space-y-8 transition-all duration-300">
        
        <Skeleton height={32} width="60%" />

        <div className="flex gap-4 items-center">
          <Skeleton height={28} width={100} borderRadius={999} />
          <Skeleton height={16} width={120} />
        </div>

        <div className="border border-gray-200 rounded-xl shadow-md p-6 space-y-4">
          <Skeleton count={4} />
        </div>
      </div>
    </div>
  );
};

export default LoadingIssueDetailPage;
