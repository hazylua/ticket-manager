import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/solid';

import TextInput from './TextInput';

function SearchBar() {
  return (
    <div className='flex gap-2 align-middle rounded'>
      <MagnifyingGlassCircleIcon className='w-8 h-auto text-gray-600' />
      <TextInput placeholder='Pesquisar tickets...' />
    </div>
  );
}

export default SearchBar;
