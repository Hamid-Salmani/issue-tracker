import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/client";
import { Status } from "@/generated/prisma/edge";
import { StatusSchema } from "@/app/Schemas";

export const runtime = "nodejs";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await request.json();
  const validation = StatusSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.flatten(), { status: 400 });

  const resolvedParams = await params;
  const id = resolvedParams.id;

  const issue = await prisma.issue.findUnique({
    where: {
      id,
    },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id },
    data: {
      status: body.status,
    },
  });
  return NextResponse.json(updatedIssue);
}
