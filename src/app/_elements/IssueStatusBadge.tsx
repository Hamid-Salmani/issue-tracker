import { Status } from "@/generated/prisma/edge";
import { Badge } from "@radix-ui/themes";
import React from "react";
import classNames from "classnames";

const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green"; bg: string }
> = {
  OPEN: { label: "Open", color: "red", bg: "bg-red-100 text-red-700" },
  IN_PROGRESS: {
    label: "In Progress",
    color: "violet",
    bg: "bg-violet-100 text-violet-700",
  },
  CLOSED: {
    label: "Closed",
    color: "green",
    bg: "bg-green-100 text-green-700",
  },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  const { label, bg } = statusMap[status];

  return (
    <span
      className={classNames(
        "px-3 py-1 rounded-full text-sm font-medium shadow-sm backdrop-blur-md",
        bg
      )}
    >
      {label}
    </span>
  );
};

export default IssueStatusBadge;
