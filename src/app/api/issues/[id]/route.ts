import { IssueSchema } from "@/app/Schemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: context.params.id
    }
  })
  if(!issue) return NextResponse.json({error: "issue not found"}, {status: 404})
  return NextResponse.json({issue})
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = IssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  const updatedIssue = await prisma.issue.update({
    where: { id: params.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updatedIssue);
}

export async function DELETE(
    request: NextRequest,
  { params }: { params: { id: string }}) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id
    }
  })
  if(!issue)  
        return NextResponse.json({ error: 'Invalid issue'}, { status: 404 });

  await prisma.issue.delete({
    where: { id: issue.id }
  });

  return NextResponse.json({});
}