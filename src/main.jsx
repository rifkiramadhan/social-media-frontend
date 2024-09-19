import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './index.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './redux/store/store.js';

//! Create instance of client
const queryClient = new QueryClient();

//! Configure Stripes
const stripePromise = loadStripe(
  'pk_test_51Q0bBK2LfqtG2Z8PbVwx54n7F1sdBTmtLvF5MV4SclR8Fk6PJf6ZZxIi66qKUC7BQAvpnabeNoT76O8VYpYwOZGn00gSif6TUC'
);

//! Stripe Options
const options = {
  mode: 'payment',
  currency: 'usd',
  amount: 1099,
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Elements stripe={stripePromise} options={options}>
          <App />
        </Elements>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
