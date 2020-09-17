import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Matches the Table Snapshot', () => {
  const { asFragment } = render(<App />)
    
  expect(asFragment(<App />)).toMatchSnapshot()
});
