import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
  LinkButton,
  Link,
} from '@backstage/core-components';
import { GithubMDDocFetchComponent } from '../GithubMDDocFetchComponent';
import { useParams } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import OpenInNew from '@material-ui/icons/OpenInNew';
import { GitHubIcon } from '@backstage/core-components';

const useStyles = makeStyles((theme: Theme) => ({
  infoCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  markdownWrapper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1, 3, 1, 3),
    borderRadius: theme.shape.borderRadius,
  },
}));

const githubBaseUrl = 'https://github.com';

export const GithubMDDocPage = () => {
  const classes = useStyles();
  /* 
    const { owner, repo, mdFilePath } = useRouteRefParams(rootRouteRef);
    should be used, but it is not working as expected. Desctructured items are undefined.
  */
  const { '*': path = '' } = useParams();

  const owner = path.split('/')[0];
  const repo = path.split('/')[1];
  const mdFilePath = path.split('/')[2];

  const ownerLink = `${githubBaseUrl}/${owner}`;
  const repoLink = `${githubBaseUrl}/${owner}/${repo}`;
  const mdFileLink = `${githubBaseUrl}/${owner}/${repo}/blob/main/${mdFilePath}`;

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
        <Grid container spacing={3} direction="column">
          <Grid item>
            <InfoCard
              title="Repository information"
              cardClassName={classes.infoCard}
            >
              <Typography variant="body1">
                Owner:{' '}
                <Link to={ownerLink}>
                  {owner} <OpenInNew fontSize="inherit" />
                </Link>
                <br />
                Repository:{' '}
                <Link to={repoLink}>
                  {repo} <OpenInNew fontSize="inherit" />
                </Link>
                <br />
                Markdown file path: {mdFilePath}
              </Typography>

              <LinkButton
                to={mdFileLink}
                color="primary"
                variant="contained"
                endIcon={<GitHubIcon />}
              >
                View file on Github
              </LinkButton>
            </InfoCard>
          </Grid>
          <Grid item>
            <div className={classes.markdownWrapper}>
              <GithubMDDocFetchComponent
                owner={owner}
                repo={repo}
                mdFilePath={mdFilePath}
              />
            </div>
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};
