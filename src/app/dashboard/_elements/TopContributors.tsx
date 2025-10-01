import React from "react";
import { Avatar, Card, Flex, Heading, Text } from "@radix-ui/themes";
import prisma from "../../../../prisma/client";

const TopContributors = async () => {
  const issues = await prisma.issue.findMany({
    where: {
      status: "CLOSED",
      updateAt: {
        gte: new Date(Date.now() - 30 * 86400000),
      },
      assignedToUserId: {
        not: null,
      },
    },
    include: {
      assignedToUser: true,
    },
  });

  const grouped = issues.reduce(
    (acc, issue) => {
      const user = issue.assignedToUser;
      if (!user) return acc;

      const key = user.id;
      if (!acc[key]) {
        acc[key] = {
          name: user.name ?? "Unknown",
          image: user.image ?? undefined,
          count: 0,
        };
      }
      acc[key].count += 1;
      return acc;
    },
    {} as Record<string, { name: string; image?: string; count: number }>
  );

  const sorted = Object.values(grouped)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <Card size="3" className="shadow-md border border-gray-200">
      <Heading size="4" mb="4" className="text-gray-800">
        🧑‍💻 Top Contributors
      </Heading>
      <div className="space-y-4">
        {sorted.map((user, i) => (
          <Flex key={i} align="center" justify="between">
            <Flex align="center" gap="3">
              <Avatar
                src={user.image}
                fallback={user.name[0]}
                size="2"
                radius="full"
              />
              <Text>{user.name}</Text>
            </Flex>
            <Text color="gray">{user.count} closed</Text>
          </Flex>
        ))}
      </div>
    </Card>
  );
};

export default TopContributors;
