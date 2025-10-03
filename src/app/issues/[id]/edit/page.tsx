import React from "react";
import IssueForm from "../../_elements/IssueForm";
import prisma from "../../../../../prisma/client";
import { useApiQuery } from "@/hooks/useApiQuery";
import { getIssueById } from "@/app/lib/api/issues";
export const runtime = "nodejs";

interface Props {
  params: { id: string };
}
const EditIssue = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });
  return (
    <div>
      <IssueForm issue={issue} />
    </div>
  );
};

export default EditIssue;
