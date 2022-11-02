import { isEmpty } from 'lodash';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFindTicketsQuery } from 'store/query';

import { setTickets } from '../store/tickets';

export default function Layout({ children }) {
  const [initialized, setInitialized] = useState(false);

  const tickets = useSelector((state) => state.tickets);

  const { data: ticketsData } = useFindTicketsQuery('', {
    skip: !isEmpty(tickets) && !initialized,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (ticketsData && initialized === false) {
      dispatch(setTickets(ticketsData));
      setInitialized(true);
    }
  }, [dispatch, ticketsData, initialized]);

  return (
    <>
      <Head>
        <title>Gerenciador de Tickets</title>
        <meta name='description' content='NextJS app.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex justify-center w-full gap-4 px-5 py-2 border-b shadow-sm bg-neutral-100'>
        <Link href='/'>
          <h1 className='inline-block px-4 py-0.5 text-2xl duration-200 ease-in rounded-md h-fit hover:text-sky-400 hover:bg-sky-50'>
            Gerenciamento de Tickets
          </h1>
        </Link>
      </div>

      {children}
    </>
  );
}
