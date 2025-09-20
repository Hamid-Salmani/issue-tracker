import z from "zod";

export const IssueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required."),
});

export const StatusSchema = z.object({
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]),
});
