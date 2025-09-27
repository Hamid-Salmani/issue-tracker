"use client";

import { Issue } from "@/generated/prisma";
import { useRouter } from "next/navigation";
import { Select, Text, Flex, Box } from "@radix-ui/themes";
import React from "react";

const statusOptions = ["OPEN", "IN_PROGRESS", "CLOSED"];

interface Props {
  issue: Issue;
}

const SelectInput = ({ issue }: Props) => {
  const router = useRouter();

  const handleChange = async (newStatus: string) => {
    await fetch(`/api/issues/updateStatus/${issue.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    router.refresh();
  };

  return (
    <Box className="w-full">
      <Select.Root defaultValue={issue.status} onValueChange={handleChange}>
        <Select.Trigger className="bg-white/80 backdrop-blur-md border border-gray-300 rounded-xl shadow-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-sky-300 transition-all duration-200" />
        <Select.Content className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-xl shadow-lg p-2">
          <Select.Group>
            {statusOptions.map((status) => (
              <Select.Item
                key={status}
                value={status}
                className="rounded-lg px-3 py-2 hover:bg-sky-50 transition-all"
              >
                <Flex align="center" gap="2">
                  <Text className="text-gray-800 font-medium">
                    {status.replace("_", " ")}
                  </Text>
                </Flex>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Box>
  );
};

export default SelectInput;
