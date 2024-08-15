import { CatalogIcon, DocsIcon } from '@backstage/core-components';
import { useApi, useRouteRef } from '@backstage/core-plugin-api';
import {
  CATALOG_FILTER_EXISTS,
  catalogApiRef,
} from '@backstage/plugin-catalog-react';
import { searchPlugin, SearchType } from '@backstage/plugin-search';
import {
  SearchBar,
  SearchFilter,
  SearchResult,
  SearchResultPager,
  useSearch,
} from '@backstage/plugin-search-react';
import { TechDocsSearchResultListItem } from '@backstage/plugin-techdocs';
import { CatalogSearchResultListItem } from '@backstage/plugin-catalog';
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CloseIcon from '@material-ui/icons/Close';
import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    gap: theme.spacing(1),
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1fr auto',
    '&> button': {
      marginTop: theme.spacing(1),
    },
  },
  container: {
    borderRadius: 30,
    display: 'flex',
    height: '2.4em',
    padding: theme.spacing(1),
  },
  filter: {
    '& + &': {
      marginTop: theme.spacing(2.5),
    },
  },
  filters: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  input: {
    flex: 1,
  },
  button: {
    '&:hover': {
      background: 'none',
    },
  },
  dialogActionsContainer: { padding: theme.spacing(1, 3) },
  viewResultsLink: { verticalAlign: '0.5em' },
}));

const rootRouteRef = searchPlugin.routes.root;

export const SearchModal = ({ toggleModal }: { toggleModal: () => void }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const catalogApi = useApi(catalogApiRef);

  const { types } = useSearch();
  const searchRootRoute = useRouteRef(rootRouteRef)();
  const searchBarRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    searchBarRef?.current?.focus();
  });

  // This handler is called when "enter" is pressed
  const handleSearchBarSubmit = useCallback(() => {
    toggleModal();
    // Using ref to get the current field value without waiting for a query debounce
    const query = searchBarRef.current?.value ?? '';
    navigate(`${searchRootRoute}?query=${query}`);
  }, [navigate, toggleModal, searchRootRoute]);

  return (
    <>
      <DialogTitle>
        <Box className={classes.dialogTitle}>
          <SearchBar
            className={classes.input}
            inputProps={{ ref: searchBarRef }}
            onSubmit={handleSearchBarSubmit}
          />

          <IconButton aria-label="close" onClick={toggleModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container direction="column">
          <Grid item>
            <SearchType.Tabs
              defaultValue="software-catalog"
              types={[
                {
                  value: 'software-catalog',
                  name: 'Software Catalog',
                },
                {
                  value: 'techdocs',
                  name: 'Documentation',
                },
                {
                  value: 'tools',
                  name: 'Tools',
                },
                {
                  value: 'github-md-docs',
                  name: 'Github Markdown files',
                },
              ]}
            />
          </Grid>
          <Grid item container>
            {types.includes('techdocs') && (
              <Grid item xs={2}>
                <SearchFilter.Select
                  className={classes.filter}
                  label="Entity"
                  name="name"
                  values={async () => {
                    // Return a list of entities which are documented.
                    const { items } = await catalogApi.getEntities({
                      fields: ['metadata.name'],
                      filter: {
                        'metadata.annotations.backstage.io/techdocs-ref':
                          CATALOG_FILTER_EXISTS,
                      },
                    });

                    const names = items.map(entity => entity.metadata.name);
                    names.sort();
                    return names;
                  }}
                />
              </Grid>
            )}
            <Grid item xs={2}>
              <SearchFilter.Select
                className={classes.filter}
                label="Kind"
                name="kind"
                values={['Component', 'Template']}
              />
            </Grid>
            <Grid item xs={2}>
              <SearchFilter.Select
                className={classes.filter}
                label="Lifecycle"
                name="lifecycle"
                values={['experimental', 'production']}
              />
            </Grid>
            <Grid
              item
              xs={types.includes('techdocs') ? 6 : 8}
              container
              direction="row-reverse"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Grid item>
                <Button
                  className={classes.button}
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  onClick={handleSearchBarSubmit}
                  disableRipple
                >
                  View Full Results
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <SearchResult>
              <CatalogSearchResultListItem icon={<CatalogIcon />} />
              <TechDocsSearchResultListItem icon={<DocsIcon />} />
            </SearchResult>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.dialogActionsContainer}>
        <Grid container direction="row">
          <Grid item xs={12}>
            <SearchResultPager />
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};
