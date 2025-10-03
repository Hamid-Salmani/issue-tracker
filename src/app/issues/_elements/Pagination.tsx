"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <Flex
      align="center"
      justify="between"
      mt="4"
      px="4"
      py="3"
      className="rounded-xl border border-white/30 bg-white/30 backdrop-blur-md shadow-[0_0px_3px_rgba(31,38,135,0.2)]"
    >
      <Text size="2" className="text-gray-700 font-medium">
        Page {currentPage} of {pageCount}
      </Text>
      <Flex gap="2">
        <Button
          variant="soft"
          color="gray"
          radius="full"
          disabled={currentPage === 1}
          onClick={() => changePage(1)}
        >
          <DoubleArrowLeftIcon />
        </Button>
        <Button
          variant="soft"
          color="gray"
          radius="full"
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          variant="soft"
          color="gray"
          radius="full"
          disabled={currentPage === pageCount}
          onClick={() => changePage(currentPage + 1)}
        >
          <ChevronRightIcon />
        </Button>
        <Button
          variant="soft"
          color="gray"
          radius="full"
          disabled={currentPage === pageCount}
          onClick={() => changePage(pageCount)}
        >
          <DoubleArrowRightIcon />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Pagination;
