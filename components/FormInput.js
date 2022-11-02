import clsx from 'clsx';
import { useField } from 'formik';

import TextInput from './TextInput';

function FormInput({ label, name, ...props }) {
  const [field, meta] = useField(name ?? props);
  const { touched, error } = meta;

  return (
    <div className='flex flex-col gap-1'>
      <label>{label}</label>

      <TextInput
        {...field}
        {...props}
        className={clsx(
          error &&
            'border-rose-400 text-rose-500 bg-rose-100 focus:border-rose-500 focus:ring-rose-500',
        )}
      />
      {touched && Boolean(error) && (
        <span className='text-sm text-rose-400 bg-rose-100 px-2 py-0.5 rounded w-fit shadow-sm'>
          {error}
        </span>
      )}
    </div>
  );
}

export default FormInput;
