import { patchIssueSchema } from "@/app/Schemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const id = params.id;

  const issue = await prisma.issue.findUnique({
    where: {
      id,
    },
  });
  if (!issue)
    return NextResponse.json({ error: "issue not found" }, { status: 404 });
  return NextResponse.json({ issue });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { assignedToUserId, title, description } = body;

  const resolvedParams = await params;
  const id = resolvedParams.id;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid user" }, { status: 404 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });
  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // تایپ جدید: params به عنوان Promise
) {
  const resolvedParams = await params; // await برای resolve کردن Promise
  const id = resolvedParams.id;

  const issue = await prisma.issue.findUnique({
    where: {
      id, // حالا id در
    },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  await prisma.issue.delete({
    where: { id }, // حالا id در دسترسه (یا می‌تونید از issue.id استفاده کنید)
  });

  return NextResponse.json({});
}
