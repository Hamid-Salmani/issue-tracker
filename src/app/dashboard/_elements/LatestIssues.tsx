import { Avatar, Card, Flex, Heading, Text, Table } from "@radix-ui/themes";
import React from "react";
import Link from "next/link";
import prisma from "../../../../prisma/client";
import IssueStatusBadge from "@/app/_elements/IssueStatusBadge";
export const runtime = "nodejs";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card size="3" className="shadow-md border border-gray-200">
      <Heading size="4" mb="4" className="text-gray-800">
        🕓 Latest Issues
      </Heading>
      <Table.Root className="w-full">
        <Table.Body>
          {issues.map((issue, inx) => (
            <Table.Row
              key={issue.id}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <Table.Cell>
                <Flex justify="between" align="center">
                  <Flex direction="column" align="start" gap="">
                    <Link
                      href={`/issues/${issue.id}`}
                      className="text-sky-600 hover:text-sky-700 font-medium transition-colors"
                    >
                      {issue.title}
                    </Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  <Text size="1" color="gray">
                    Created: {issue.createdAt.toLocaleDateString()}
                  </Text>
                  {issue.assignedToUser ? (
                    <Flex align="center" gap="2">
                      <Avatar
                        src={issue.assignedToUser.image ?? undefined}
                        fallback="?"
                        size="2"
                        radius="full"
                      />
                      <Text size="2" color="gray">
                        {issue.assignedToUser.name}
                      </Text>
                    </Flex>
                  ) : (
                    <Text size="2" color="gray">
                      Unassigned
                    </Text>
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
