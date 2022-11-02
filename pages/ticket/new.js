import Button from 'components/Button';
import Container from 'components/Container';
import TicketForm, { ticketSchema } from 'components/Ticket/TicketForm';
import TitleHeader from 'components/TitleHeader';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTicket } from 'store/tickets';

function TicketNew() {
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleSubmitNewTicket = async (values) => {
    try {
      setSubmitted(false);
      dispatch(addTicket(values));
      setSubmitted(true);
    } catch (e) {
      console.log(e);
    }
  };

  const ticketForm = useFormik({
    initialValues: {
      title: '',
      description: '',
      client: '',
    },
    validationSchema: ticketSchema,
    onSubmit: handleSubmitNewTicket,
  });

  return (
    <Container className='flex flex-col w-1/3'>
      <TitleHeader title='Ticket' accent='New'>
        {submitted && (
          <div className='px-2 py-1 rounded shadow-sm text-sky-400 bg-sky-200'>
            Ticket created!
          </div>
        )}
        <Button
          type='submit'
          className='flex items-center gap-2 bg-sky-500 border-sky-600 hover:bg-sky-600'
          onClick={ticketForm.handleSubmit}
        >
          Submit
        </Button>
      </TitleHeader>
      <TicketForm form={ticketForm} />
    </Container>
  );
}

export default TicketNew;
