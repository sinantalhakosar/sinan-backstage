/*
 * Copyright 2024 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { GithubMDDocFetchComponent } from './GithubMDDocFetchComponent';

// Mock the fetch function, fileResponse.text()
jest.mock('fetch', () => {
  return jest.fn().mockImplementation(() => {
    return {
      text: jest.fn().mockResolvedValue('# Hello World'),
    };
  });
});

describe('ExampleFetchComponent', () => {
  it('renders the user table', async () => {
    render(
      <GithubMDDocFetchComponent
        owner="repo_owner"
        repo="repo"
        mdFilePath="path"
      />,
    );

    // Test will be here
  });
});
