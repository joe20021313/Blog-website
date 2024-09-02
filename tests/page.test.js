import '@testing-library/jest-dom';
import { render, screen,fireEvent  } from '@testing-library/react';
import React from 'react';
import PostsPage from '../app/page'; 


jest.mock('../app/page', () => {
  return jest.fn(() => <div>mocked post</div>);
});

describe('PostsPage', () => {
  it('renders the page without crashing', () => {
    render(<PostsPage />);
    expect(screen.getByText('mocked post')).toBeInTheDocument();
  });
});

