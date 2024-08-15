import React from 'react';
import { Typography } from '@material-ui/core';
import {
  InfoCard,
  LinkButton,
  Link,
  GitHubIcon,
} from '@backstage/core-components';
import { makeStyles } from '@material-ui/core/styles';
import OpenInNew from '@material-ui/icons/OpenInNew';

const useStyles = makeStyles(() => ({
  infoCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

type Info = {
  text: string;
  link: string;
};

interface Props {
  owner: Info;
  repo: Info;
  mdFilePath: Info;
}

export const GithubMDDocInfoCard = ({ owner, repo, mdFilePath }: Props) => {
  const classes = useStyles();

  return (
    <InfoCard title="Repository information" cardClassName={classes.infoCard}>
      <Typography variant="body1">
        Owner:{' '}
        <Link to={owner.link}>
          {owner.text} <OpenInNew fontSize="inherit" />
        </Link>
        <br />
        Repository:{' '}
        <Link to={repo.link}>
          {repo.text} <OpenInNew fontSize="inherit" />
        </Link>
        <br />
        Markdown file path: {mdFilePath.text}
      </Typography>

      <LinkButton
        to={mdFilePath.link}
        color="primary"
        variant="contained"
        endIcon={<GitHubIcon />}
      >
        View file on Github
      </LinkButton>
    </InfoCard>
  );
};
