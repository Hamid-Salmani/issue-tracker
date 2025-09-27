import IssueStatusBadge from "@/app/_elements/IssueStatusBadge";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "../../../../prisma/client";
import SelectInput from "../_elements/SelectInput";
import DeleteIssueButton from "../_elements/DeleteIssueButton";
import AssigneeSelect from "../_elements/AssigneeSelect";

interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });
  if (!issue) notFound();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white/60 backdrop-blur-xl border border-white/30 rounded-3xl p-8 md:p-10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-all duration-300 space-y-8">
        <div className="flex items-center justify-between gap-4">
          <Heading
            size="4"
            className="text-gray-900 text-3xl font-bold tracking-tight leading-snug"
          >
            {issue.title}
          </Heading>

          <div className="flex justify-end gap-2 w-full">
            <Link href="/issues">
              <Button
                variant="soft"
                color="gray"
                className="rounded-xl shadow-sm !cursor-pointer"
              >
                ← Back
              </Button>
            </Link>
            <Link href={`/issues/${issue.id}/edit`}>
              <Button
                variant="soft"
                color="blue"
                className="rounded-xl shadow-sm !cursor-pointer"
              >
                ✏️ Edit
              </Button>
            </Link>
            <DeleteIssueButton issueId={issue.id} />
          </div>
        </div>
        <Flex className="flex-wrap gap-3 items-center">
          <IssueStatusBadge status={issue.status} />
          <Text className="text-gray-600 text-sm">
            {issue.createdAt.toDateString()}
          </Text>
        </Flex>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Text className="text-gray-700 font-medium mb-2 block">Status</Text>
            <SelectInput issue={issue} />
          </div>
          <div>
            <Text className="text-gray-700 font-medium mb-2 block">
              Assignee
            </Text>
            <AssigneeSelect issue={issue} />
          </div>
        </div>

        <Card className="border border-gray-200 rounded-xl shadow-md p-6">
          <Text className="text-gray-800 leading-relaxed whitespace-pre-line text-base">
            {issue.description}
          </Text>
        </Card>
      </div>
    </div>
  );
};

export default IssueDetailPage;
