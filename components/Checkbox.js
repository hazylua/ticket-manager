import clsx from 'clsx';
import { forwardRef } from 'react';

const Checkbox = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type='checkbox'
      className={clsx('ease-in duration-200 rounded accent-sky-400', className)}
      {...props}
    />
  );
});
Checkbox.displayName = 'Check';

// function Checkbox({ children, className, ...props }) {
//   return (
//     <input
//       type='checkbox'
//       className={clsx('ease-in duration-200 rounded accent-sky-400', className)}
//       {...props}
//     />
//   );
// }

export default Checkbox;
