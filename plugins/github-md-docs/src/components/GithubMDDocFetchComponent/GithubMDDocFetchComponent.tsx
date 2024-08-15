import React from 'react';
import { Progress, ResponseErrorPanel } from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';
import { MarkdownContent } from '@backstage/core-components';

const rawGithubBaseUrl = `https://raw.githubusercontent.com`;

interface Props {
  owner: string;
  repo: string;
  mdFilePath: string;
}

export const GithubMDDocFetchComponent = ({
  owner,
  repo,
  mdFilePath,
}: Props) => {
  const { value, loading, error } = useAsync(async (): Promise<string> => {
    try {
      const fileUrl = `${rawGithubBaseUrl}/${owner}/${repo}/main/${mdFilePath}`;
      const fileResponse = await fetch(fileUrl);

      const content = await fileResponse.text();

      return content;
    } catch (exception) {
      return (exception as Error).message;
    }
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  if (!value) {
    return null;
  }

  return <MarkdownContent content={value} linkTarget="_blank" />;
};
