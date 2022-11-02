import Button from 'components/Button';
import Container from 'components/Container';
import TicketForm, { ticketSchema } from 'components/Ticket/TicketForm';
import TitleHeader from 'components/TitleHeader';
import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFindTicketsQuery } from 'store/query';
import { updateTicket } from 'store/tickets';

function TicketEdit() {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { isFetching, isSuccess } = useFindTicketsQuery('');
  const tickets = useSelector((state) => state.tickets);

  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const [ticket, setTicket] = useState(undefined);

  useEffect(() => {
    if (!isEmpty(tickets) && id && isSuccess && !isFetching) {
      const ticketIdx = tickets.findIndex((ticket) => ticket.id === id);
      setTicket(tickets[ticketIdx]);
    }
  }, [tickets, id, isSuccess, isFetching]);

  const handleSubmitNewTicket = async (values) => {
    try {
      setSubmitted(false);
      dispatch(updateTicket(values));
      setSubmitted(true);
    } catch (e) {
      console.log(e);
    }
  };

  const ticketForm = useFormik({
    initialValues: ticket ?? {
      title: '',
      description: '',
      client: '',
    },
    validationSchema: ticketSchema,
    onSubmit: handleSubmitNewTicket,
    enableReinitialize: true,
  });

  return (
    <Container className='flex flex-col w-1/3'>
      <TitleHeader title='Ticket' accent='Edit'>
        {submitted && (
          <div className='px-2 py-1 rounded shadow-sm text-sky-400 bg-sky-200'>
            Ticket updated!
          </div>
        )}
        <Button
          type='submit'
          className='flex items-center gap-2 bg-sky-500 border-sky-600 hover:bg-sky-600'
          onClick={ticketForm.handleSubmit}
        >
          Update
        </Button>
      </TitleHeader>
      <TicketForm form={ticketForm} />
    </Container>
  );
}

export default TicketEdit;
