import Layout from 'components/Layout';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store from 'store';
import { useFindTicketsQuery } from 'store/query';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
