import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { IssueSchema } from "@/app/Schemas";
export const runtime = "nodejs";

export async function GET() {
  const issues = await prisma.issue.findMany()
  if(!issues) return NextResponse.json({error: "Issues not found"} , {status: 404})
  return NextResponse.json({issues})
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = IssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.flatten(), { status: 400 });
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
