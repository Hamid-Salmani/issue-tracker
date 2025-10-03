import IssueStatusBadge from "@/app/_elements/IssueStatusBadge";
import { Issue } from "@/generated/prisma/edge";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
interface Props {
  Issues: Issue[];
}
const IssueTable = ({ Issues }: Props) => {
  return (
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
        {Issues.length === 0 ? (
          <Table.Row>
            <Table.Cell colSpan={3} className="text-center py-10 text-gray-500">
              No issues found.
            </Table.Cell>
          </Table.Row>
        ) : (
          Issues.map((issue) => (
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
  );
};

export default IssueTable;
