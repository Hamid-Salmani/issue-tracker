'use client';

import { Button, TextArea, TextField, Callout } from '@radix-ui/themes';
import React from 'react';
import { useApiMutation } from '@/hooks/useApiMutation';
import { createIssue } from '@/app/lib/api/issues';
import { useForm } from 'react-hook-form';
import { IssueType } from '@/types/createIssue';
import { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { IssueSchema } from '@/app/Schemas';
import { z } from 'zod';
import Spinner from '@/app/_elements/Spinner';
import Link from 'next/link';
import IssueForm from '../_elements/IssueForm';

type IssueForm = z.infer<typeof IssueSchema>;

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
  } = useApiMutation<IssueType, unknown>(createIssue);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(IssueSchema),
  });

  const fieldErrors: Partial<Record<keyof IssueForm, string>> =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    (error as AxiosError)?.response?.data?.fieldErrors || {};

  const onSubmit = (data: IssueType) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
      <>
        <IssueForm />
      </>
  );
};

export default NewIssuePage;
