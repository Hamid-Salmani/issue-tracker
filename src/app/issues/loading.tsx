import { Table } from '@radix-ui/themes';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import IssueActions from './_elements/IssueActions';

const LoadingIssuesPage = () => {
  const issues = [1, 2, 3, 4, 5];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white/60 backdrop-blur-xl border border-white/30 rounded-3xl p-10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-all duration-300">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-gray-900 text-3xl font-bold tracking-tight">📋 Loading Issues</h2>
          <IssueActions />
        </div>

        <Table.Root variant="surface" className="w-full">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell className="text-gray-700 text-sm uppercase tracking-wide">Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell text-gray-700 text-sm uppercase tracking-wide">Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell text-gray-700 text-sm uppercase tracking-wide">Created</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue} className="hover:bg-white/80 transition-all duration-150">
                <Table.Cell>
                  <Skeleton height={20} width="70%" />
                  <div className="block md:hidden mt-2">
                    <Skeleton height={16} width="40%" />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <Skeleton height={20} width="60%" />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <Skeleton height={20} width="50%" />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
};

export default LoadingIssuesPage;
