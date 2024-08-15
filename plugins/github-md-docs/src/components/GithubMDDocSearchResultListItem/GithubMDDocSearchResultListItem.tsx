import React, { ReactNode } from 'react';
import {
  IndexableDocument,
  ResultHighlight,
} from '@backstage/plugin-search-common';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Link } from '@backstage/core-components';
import { HighlightedSearchResultText } from '@backstage/plugin-search-react';
import { makeStyles } from '@material-ui/core/styles';
import OpenInNew from '@material-ui/icons/OpenInNew';

/* 
    Duplicate from plugins/search-backend-module-github-md-docs/src/types.ts
    Make sure to keep both in sync
*/
interface GithubMDDocument extends IndexableDocument {
  repositoryLink: string;
  repositoryOwner: string;
  repositoryName: string;
}

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  secondary: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

export interface GithubMDDocSearchResultListItemProps {
  icon?: ReactNode;
  secondaryAction?: ReactNode;
  result?: GithubMDDocument;
  highlight?: ResultHighlight;
  rank?: number;
  lineClamp?: number;
  toggleModal?: () => void;
}

export const GithubMDDocSearchResultListItem = ({
  result,
  highlight,
  icon,
  secondaryAction,
  lineClamp = 5,
}: GithubMDDocSearchResultListItemProps) => {
  const classes = useStyles();

  if (!result) return null;

  return (
    <div className={classes.wrapper}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText
        primaryTypographyProps={{ variant: 'h6' }}
        primary={
          <Link noTrack to={result.location}>
            {highlight?.fields.title ? (
              <HighlightedSearchResultText
                text={highlight?.fields.title || ''}
                preTag={highlight?.preTag || ''}
                postTag={highlight?.postTag || ''}
              />
            ) : (
              result.title
            )}
          </Link>
        }
        secondary={
          <div className={classes.secondary}>
            <Typography
              component="span"
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: lineClamp,
                overflow: 'hidden',
              }}
              color="textPrimary"
              variant="body2"
            >
              Path:{' '}
              {highlight?.fields.text ? (
                <HighlightedSearchResultText
                  text={highlight.fields.text}
                  preTag={highlight.preTag}
                  postTag={highlight.postTag}
                />
              ) : (
                result.text
              )}
            </Typography>

            <Typography
              component="span"
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: lineClamp,
                overflow: 'hidden',
              }}
              color="textSecondary"
              variant="body2"
            >
              Repository:{' '}
              <Link noTrack to={result.repositoryLink}>
                {highlight?.fields.repositoryOwner ? (
                  <HighlightedSearchResultText
                    text={highlight.fields.repositoryOwner}
                    preTag={highlight.preTag}
                    postTag={highlight.postTag}
                  />
                ) : (
                  result.repositoryOwner
                )}
                /
                {highlight?.fields.repositoryName ? (
                  <HighlightedSearchResultText
                    text={highlight.fields.repositoryName}
                    preTag={highlight.preTag}
                    postTag={highlight.postTag}
                  />
                ) : (
                  result.repositoryName
                )}
                <OpenInNew fontSize="inherit" />
              </Link>
            </Typography>
          </div>
        }
      />
    </div>
  );
};
