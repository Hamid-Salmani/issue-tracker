"use client";
import { fetchUsers } from "@/app/lib/api/users";
import { Issue, User } from "@/generated/prisma";
import { useApiQuery } from "@/hooks/useApiQuery";
import {
  Select,
  Avatar,
  Flex,
  Text,
  Box,
  Spinner,
  Callout,
} from "@radix-ui/themes";
import axios from "axios";
import React from "react";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data, isLoading, error } = useApiQuery(["users"], fetchUsers);

  if (isLoading)
    return (
      <Box className="flex items-center justify-center py-4">
        <Spinner />
      </Box>
    );

  if (error)
    return (
      <Callout.Root color="red" className="mt-2">
        <Callout.Text>Failed to load assignees</Callout.Text>
      </Callout.Root>
    );

  if (!data)
    return (
      <Text className="text-gray-500 text-sm mt-2">No users available</Text>
    );

  return (
    <Select.Root
      defaultValue={issue?.assignedToUserId ?? "unassigned"}
      onValueChange={(userId) =>
        axios.patch(`/api/issues/${issue.id}`, {
          assignedToUserId: userId === "unassigned" ? null : userId,
        })
      }
    >
      <Select.Trigger
        placeholder="Assign to..."
        className="bg-white/80 backdrop-blur-md border border-gray-300 rounded-xl shadow-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-sky-300"
      />
      <Select.Content className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-xl shadow-lg p-2">
        <Select.Group>
          <Select.Item
            value="unassigned"
            className="rounded-lg px-3 py-2 hover:bg-sky-50 transition-all"
          >
            <Text className="text-gray-800 font-medium">Unassigned</Text>
          </Select.Item>
          {data.map((user: User) => (
            <Select.Item
              key={user.id}
              value={user.id}
              className="rounded-lg px-3 py-2 hover:bg-sky-50 transition-all"
            >
              <Flex align="center" gap="3">
                <Avatar
                  src={user.image ?? undefined}
                  fallback={user?.name![0]?.toUpperCase()}
                  size="1"
                  radius="full"
                />
                <Text className="text-gray-800 font-medium">{user.name}</Text>
              </Flex>
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
