import React from 'react';
import {
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
  LinkButton,
  EmptyState,
} from '@backstage/core-components';
import { useParams, useSearchParams } from 'react-router-dom';
import { GithubMDDocContent } from '../GithubMDDocContent';

export const GithubMDDocPage = () => {
  /* 
    const { owner, repo, mdFilePath } = useRouteRefParams(rootRouteRef);
    should be used, but it is not working as expected. Desctructured items are undefined.
  */
  const { '*': path = '' } = useParams();

  const owner = path.split('/')[0];
  const repo = path.split('/')[1];

  const [searchParams] = useSearchParams();
  const mdFilePath = searchParams.get('path');

  const showEmptyState = !owner || !repo || !mdFilePath;

  return (
    <Page themeId="tool">
      <Header
        title="Welcome to github-md-docs!"
        subtitle="You can check information for .md files on Github"
      >
        <HeaderLabel label="Owner" value="Sinan Talha KOSAR" />
        <HeaderLabel label="Lifecycle" value="Development" />
      </Header>

      <Content>
        <ContentHeader title="Github Markdown Document">
          <SupportButton>View .md file on Github repository here</SupportButton>
        </ContentHeader>

        {showEmptyState ? (
          <EmptyState
            missing="content"
            title="Missing parameters"
            description="Check out url parameters. It should be in the format of /owner/repo?path=mdFilePath"
            action={
              <LinkButton to="/" variant="contained">
                Home
              </LinkButton>
            }
          />
        ) : (
          <GithubMDDocContent
            owner={owner}
            repo={repo}
            mdFilePath={mdFilePath}
          />
        )}
      </Content>
    </Page>
  );
};
