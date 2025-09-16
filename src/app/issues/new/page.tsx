'use client';

import { Button, TextArea, TextField, Callout } from '@radix-ui/themes';
import React from 'react';
import { useApiMutation } from '@/hooks/useApiMutation';
import { createIssue } from '@/app/lib/api/issues';
import { useForm } from 'react-hook-form';
import { createIssueType } from '@/types/createIssue';
import { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/createIssueSchema';
import { z } from 'zod';

type IssueForm = z.infer<typeof createIssueSchema>;

const FieldError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <p className="text-red-500 text-sm mt-1">{message}</p>
  );
};

const NewIssuePage = () => {
  const {
    mutate,
    isPending,
    isSuccess,
    error,
  } = useApiMutation<createIssueType, unknown>(createIssue);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const fieldErrors: Partial<Record<keyof IssueForm, string>> =
    //@ts-ignore
    (error as AxiosError)?.response?.data?.fieldErrors || {};

  const onSubmit = (data: createIssueType) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7ff] to-[#ffffff] p-6 pb-20">
  <div className="w-full max-w-xl bg-white/60 backdrop-blur-xl border border-white/30 rounded-3xl p-10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-all duration-300">
    <h2 className="text-gray-900 text-3xl font-bold mb-8 tracking-tight">📝 Submit a New Issue</h2>

    <form className="space-y-6 bg-transparent" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <TextField.Root
          placeholder="Title"
          size="3"
          radius="large"
          className="w-full bg-white/80 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-sky-300 focus:outline-none"
          {...register('title')}
        />
        <FieldError message={errors.title?.message || fieldErrors.title} />
      </div>

      <div className="space-y-2">
        <TextArea
          placeholder="Description"
          size="3"
          radius="large"
          className="w-full bg-white/80 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-sky-300 focus:outline-none"
          {...register('description')}
        />
        <FieldError message={errors.description?.message || fieldErrors.description} />
      </div>

      <Button
        disabled={isPending}
        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 rounded-xl transition-all duration-200 shadow-lg"
      >
        {isPending ? 'Submitting...' : 'Submit New Issue'}
      </Button>
    </form>
    {isSuccess && (
      <Callout.Root color="green" className="mt-6">
        <Callout.Text>✅ Issue created successfully!</Callout.Text>
      </Callout.Root>
    )}
  </div>
</div>

  );
};

export default NewIssuePage;
