import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import Button from 'components/Button';
import Field from 'components/Field';
import Spinner from 'components/Spinner';
import Table from 'components/Table';
import TitleHeader from 'components/TitleHeader';
import { useDebounce } from 'hooks/useDebounce';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFindTicketsQuery } from 'store/query';
import { deleteTickets, setTickets } from 'store/tickets';

import Container from '../components/Container';

/** @type {import('react-table').Column[]} */
const ticketsColumnDefs = [
  {
    Header: 'ID',
    accessor: 'id',
    disableFilters: true,
    Cell: (props) => (
      <Link
        className='duration-200 ease-in hover:text-sky-400'
        title={`Editar ticket ${props.value.substring(0, 8)}`}
        href={`/ticket/${props.value}`}
      >
        {props.value}
      </Link>
    ),
  },
  {
    Header: 'Title',
    accessor: 'title',
    disableFilters: true,
  },
  {
    Header: 'Description',
    accessor: 'description',
    disableFilters: true,
  },
  {
    Header: 'Client',
    accessor: 'client',
    disableFilters: true,
  },
];

const emptyArr = [];

export default function TicketTable() {
  const { isLoading, isFetching, refetch } = useFindTicketsQuery('');

  const tickets = useSelector((state) => state.tickets);

  const [selectedTickets, setSelectedTickets] = useState([]);

  const dispatch = useDispatch();

  /** @param {import('react-table').Row[]} ticketsRows */
  const handleSelectedItems = useCallback((ticketsRows) => {
    setSelectedTickets(ticketsRows);
  }, []);

  const handleDeleteTickets = () => {
    const ticketsToExclude = selectedTickets.map((row) => row.original);
    dispatch(deleteTickets(ticketsToExclude));
  };

  const [filteredTickets, setFilteredTickets] = useState(null);

  const { handleInputChange, isTyping } = useDebounce();

  useEffect(() => {
    if (tickets) {
      setFilteredTickets(tickets);
    }
  }, [tickets]);

  const handleFilterText = useCallback(
    (e) => {
      const filtered = tickets.filter((ticket) =>
        ticket.title.includes(e.target.value),
      );
      setFilteredTickets(filtered);
    },
    [tickets],
  );

  return (
    <Container>
      <TitleHeader title='Tickets'>
        {/* <Spinner className='text-sky-500' /> */}
        <Field
          startIcon={
            isTyping ? (
              <Spinner className='w-5 text-sky-500' />
            ) : (
              <MagnifyingGlassIcon className='w-5 text-inherit text-neutral-400' />
            )
          }
          inputProps={{
            title: 'Search',
            placeholder: 'Search tickets by title...',
            onKeyDown: (e) => {
              handleInputChange(e, () => handleFilterText(e));
            },
          }}
        />
        <div className='flex flex-row justify-center gap-4'>
          <Link href='/ticket/new'>
            <Button className='flex items-center gap-2 bg-sky-500 border-sky-600 hover:bg-sky-600'>
              <PlusIcon className='h-5' />
              New Ticket
            </Button>
          </Link>
          <Button
            className='flex items-center gap-2 bg-rose-500 border-rose-600 hover:bg-rose-600 disabled:border-rose-900 disabled:bg-rose-900 disabled:text-neutral-400'
            disabled={selectedTickets.length === 0}
            onClick={handleDeleteTickets}
          >
            <TrashIcon className='h-5' />
            Remove Ticket(s)
          </Button>
          <Button
            disabled={isFetching}
            className='flex items-center gap-2 bg-neutral-400 border-neutral-500 hover:bg-neutral-500 disabled:bg-neutral-900 disabled:text-neutral-400 flex-nowrap'
            onClick={() => {
              dispatch(setTickets(null));
              refetch();
            }}
          >
            {isFetching ? (
              <Spinner className='w-5 h-5' />
            ) : (
              <ArrowPathIcon className='w-5 h-5' />
            )}
            Recarregar Dados
          </Button>
        </div>
      </TitleHeader>
      <div className='flex flex-grow w-full'>
        <Table
          isLoading={isLoading}
          isFetching={isFetching}
          handleSelectedRows={handleSelectedItems}
          tableData={filteredTickets ?? emptyArr}
          columnDefs={ticketsColumnDefs}
          tablePageSizes={[5, 10, 20]}
        />
      </div>
    </Container>
  );
}
