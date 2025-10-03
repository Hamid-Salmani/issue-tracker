import { Status } from "@/generated/prisma/edge";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "../../../prisma/client";
import IssueStatusBadge from "../_elements/IssueStatusBadge";
import IssueActions from "./_elements/IssueActions";
import IssueStatusFilter from "./_elements/IssueStatusFilter";
import IssueTable from "./_elements/IssueTable";
import Pagination from "./_elements/Pagination";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) => {
  const { status = "all", page = "1" } = await searchParams;
  const currentPage = parseInt(page);
  const pageSize = 5;

  const whereClause = status !== "all" ? { status: status as Status } : {};

  const [issues, issueCount] = await Promise.all([
    prisma.issue.findMany({
      where: whereClause,
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    }),
    prisma.issue.count({ where: whereClause }),
  ]);
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white/60 backdrop-blur-xl border border-white/30 rounded-3xl p-10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="space-y-3 mb-3">
            <h2 className="text-gray-900 text-3xl font-bold tracking-tight">
              📋 All Issues
            </h2>
            <IssueStatusFilter />
          </div>
          <IssueActions />
        </div>
        <IssueTable Issues={issues} />
        <div className="mt-2">
          <Pagination
            pageSize={pageSize}
            currentPage={currentPage}
            itemCount={issueCount}
          />
        </div>
      </div>
    </div>
  );
};

export default IssuesPage;
