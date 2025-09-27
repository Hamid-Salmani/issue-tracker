"use client";

import {
  Button,
  TextArea,
  TextField,
  Callout,
  Separator,
  Text,
} from "@radix-ui/themes";
import React from "react";
import { useApiMutation } from "@/hooks/useApiMutation";
import { createIssue, editeIssue } from "@/app/lib/api/issues";
import { useForm } from "react-hook-form";
import { IssueType } from "@/types/createIssue";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { IssueSchema } from "@/app/Schemas";
import { z } from "zod";
import Spinner from "@/app/_elements/Spinner";
import Link from "next/link";
import { Issue } from "@/generated/prisma";
import AssigneeSelect from "./AssigneeSelect";

type IssueFormData = z.infer<typeof IssueSchema>;

const FieldError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return <p className="text-red-500 text-sm mt-1">{message}</p>;
};

const IssueForm = ({ issue }: { issue?: Issue | null }) => {
  const { mutate, isPending, isSuccess, error } = useApiMutation<
    IssueType & { id?: string },
    unknown
  >(issue ? editeIssue : createIssue);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
    defaultValues: {
      title: issue?.title || "",
      description: issue?.description || "",
    },
  });

  const fieldErrors: Partial<Record<keyof IssueFormData, string>> =
    //@ts-ignore
    (error as AxiosError)?.response?.data?.fieldErrors || {};

  const onSubmit = (data: IssueFormData) => {
    const payload = issue ? { ...data, id: issue.id } : data;
    mutate(payload, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 pb-20 bg-gradient-to-br from-sky-50 to-white">
      <div className="w-full max-w-xl bg-white/60 backdrop-blur-xl border border-white/30 rounded-3xl p-10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-all duration-300">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-gray-900 text-3xl font-bold tracking-tight">
            📝 {issue ? "Edit Issue" : "Submit a New Issue"}
          </h2>
          <Link href="/issues">
            <Button
              variant="soft"
              color="gray"
              className="rounded-xl shadow-sm !cursor-pointer"
            >
              ← Back
            </Button>
          </Link>
        </div>

        <form
          className="space-y-6 bg-transparent"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <TextField.Root
              placeholder="Title"
              size="3"
              radius="large"
              className="w-full bg-white/80 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-sky-300 focus:outline-none"
              {...register("title")}
            />
            <FieldError message={errors.title?.message || fieldErrors.title} />
          </div>

          <div className="space-y-2">
            <TextArea
              placeholder="Description"
              size="3"
              radius="large"
              className="w-full bg-white/80 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-sky-300 focus:outline-none"
              {...register("description")}
            />
            <FieldError
              message={errors.description?.message || fieldErrors.description}
            />
          </div>

            <Separator size="4" className="my-4" />

          <Button
            disabled={isPending}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 rounded-xl transition-all duration-200 shadow-lg !cursor-pointer"
          >
            {isPending ? (
              <Spinner />
            ) : issue ? (
              "Edit Issue"
            ) : (
              "Submit New Issue"
            )}
          </Button>
        </form>

        {isSuccess && (
          <Callout.Root color="green" className="mt-6">
            <Callout.Text>
              ✅{" "}
              {issue
                ? "Issue updated successfully!"
                : "Issue created successfully!"}
            </Callout.Text>
          </Callout.Root>
        )}
      </div>
    </div>
  );
};

export default IssueForm;
