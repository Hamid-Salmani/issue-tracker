import React from "react";
import prisma from "../../../prisma/client";
import BarChart from "./_elements/BarChart";
import LatestIssues from "./_elements/LatestIssues";
import TopContributors from "./_elements/TopContributors";
export const runtime = "nodejs";

const page = async () => {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  return (
    <div className="p-6">
      <div className="w-full max-w-6xl mx-auto bg-white/60 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-all duration-300">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">📊 Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <div className="bg-white/70 rounded-2xl p-6 shadow-sm border border-gray-200 h-64 flex items-center justify-center">
              <BarChart open={open} closed={closed} inProgress={inProgress} />
            </div>
            <div>
              <TopContributors />
            </div>
          </div>
          <div>
            <LatestIssues />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
