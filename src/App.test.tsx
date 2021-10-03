import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { store } from './redux/store';
import App from './App';

test('main page mounted', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );

  expect(getByText(/search/i)).toBeInTheDocument();
});
