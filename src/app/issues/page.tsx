import { Status } from "@/generated/prisma";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "../../../prisma/client";
import IssueStatusBadge from "../_elements/IssueStatusBadge";
import IssueActions from "./_elements/IssueActions";
import IssueStatusFilter from "./_elements/IssueStatusFilter";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ status: string }>;
}) => {
  const { status } = await searchParams;
  const issues = await prisma.issue.findMany({
    where: status && status !== "all" ? { status: status as Status } : {},
  });
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
          {/* <Link href="/issues/new"> */}
          {/* </Link> */}
        </div>

        <Table.Root variant="surface" className="w-full">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell className="text-gray-700 text-sm uppercase tracking-wide">
                Issue
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell text-gray-700 text-sm uppercase tracking-wide">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell text-gray-700 text-sm uppercase tracking-wide">
                Created
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.length === 0 ? (
              <Table.Row>
                <Table.Cell
                  colSpan={3}
                  className="text-center py-10 text-gray-500"
                >
                  No issues found.
                </Table.Cell>
              </Table.Row>
            ) : (
              issues.map((issue) => (
                <Table.Row
                  key={issue.id}
                  className="hover:bg-white/80 transition-all duration-150"
                >
                  <Table.Cell className="text-gray-900 font-medium">
                    <Link
                      href={`/issues/${issue.id}`}
                      className="text-sky-600 hover:text-sky-700 hover:underline transition-colors"
                    >
                      {issue.title}
                    </Link>
                    <div className="block md:hidden mt-1">
                      <IssueStatusBadge status={issue.status} />
                    </div>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    <IssueStatusBadge status={issue.status} />
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell text-gray-600">
                    {issue.createdAt.toDateString()}
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
};

export default IssuesPage;
