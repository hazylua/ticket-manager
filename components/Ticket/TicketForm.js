import clsx from 'clsx';
import FormInput from 'components/FormInput';
import TextInput from 'components/TextInput';
import { Field, Form, FormikProvider, useField, useFormik } from 'formik';
import React from 'react';
import { object, string } from 'yup';

export const ticketSchema = object({
  id: string().optional(),
  title: string('A title must be provided.').required('Title is required.'),
  description: string('A description must be provided.').required(
    'Description is required.',
  ),
  client: string('A client must be provided.').required('Client is required.'),
});

function TicketForm({ form }) {
  return (
    <FormikProvider value={form}>
      <Form>
        <div className='flex flex-col gap-2 px-4 py-4'>
          {form.values?.id && <FormInput name='id' label={'ID'} disabled />}
          <div>
            <FormInput name='title' label={'Title'} />
          </div>
          <div>
            <FormInput name='description' label={'Description'} />
          </div>
          <div>
            <FormInput name='client' label={'Client'} />
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
}

export default TicketForm;
