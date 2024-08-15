import React from 'react';
import {
  Progress,
  ResponseErrorPanel,
  MarkdownContent,
} from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';
import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { GithubMDDocInfoCard } from '../GithubMDDocInfoCard';

const useStyles = makeStyles((theme: Theme) => ({
  markdownWrapper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1, 3, 1, 3),
    borderRadius: theme.shape.borderRadius,
  },
}));

const githubBaseUrl = 'https://github.com';
const rawGithubBaseUrl = `https://raw.githubusercontent.com`;

interface Props {
  owner: string;
  repo: string;
  mdFilePath: string;
}

export const GithubMDDocContent = ({ owner, repo, mdFilePath }: Props) => {
  const classes = useStyles();

  const { value, loading, error } = useAsync(async (): Promise<
    string | Error
  > => {
    try {
      const fileUrl = `${rawGithubBaseUrl}/${owner}/${repo}/main/${mdFilePath}`;
      const fileResponse = await fetch(fileUrl).then(response => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch file content: ${response.statusText}`,
          );
        }
        return response;
      });

      const content = await fileResponse.text();

      return content;
    } catch (exception) {
      return exception as Error;
    }
  }, [mdFilePath]);

  if (loading) {
    return <Progress />;
  }

  if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  if (value instanceof Error) {
    return <ResponseErrorPanel error={value} />;
  }

  return (
    <Grid container spacing={3} direction="column">
      <Grid item>
        <GithubMDDocInfoCard
          owner={{ text: owner, link: `${githubBaseUrl}/${owner}` }}
          repo={{ text: repo, link: `${githubBaseUrl}/${owner}/${repo}` }}
          mdFilePath={{
            text: mdFilePath,
            link: `${githubBaseUrl}/${owner}/${repo}/blob/main/${mdFilePath}`,
          }}
        />
      </Grid>
      <Grid item>
        <div className={classes.markdownWrapper}>
          <MarkdownContent content={value ?? ''} linkTarget="_blank" />
        </div>
      </Grid>
    </Grid>
  );
};
