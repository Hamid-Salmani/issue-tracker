import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/client";
import { Status } from "@/generated/prisma";
import { StatusSchema } from "@/app/Schemas";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = StatusSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.flatten(), { status: 400 });
  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  const updatedIssue = await prisma.issue.update({
    where: { id: params.id },
    data: {
      status: body.status,
    },
  });
  return NextResponse.json(updatedIssue);
}
