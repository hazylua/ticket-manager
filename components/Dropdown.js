import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import React, { Fragment } from 'react';

/**
 * @typedef {import("react").AnchorHTMLAttributes.<HTMLAnchorElement>} AnchorHTMLAttributes
 * @typedef {import("react").DetailedHTMLProps.<AnchorHTMLAttributes, HTMLAnchorElement>} AnchorProps
 *
 * @param {{
 *  title: string,
 *  items: { label: string, props: AnchorProps }
 * }} */
function Dropdown({ title, items }) {
  return (
    <Menu as='div' className='relative inline-block text-left h-fit'>
      <div>
        <Menu.Button className='inline-flex items-center justify-center w-full px-3 py-1 font-medium duration-300 ease-in border rounded-sm'>
          {title}
          <ChevronDownIcon
            className='w-5 h-5 ml-2 mr-1 text-inherit '
            aria-hidden='true'
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute left-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg w-72 ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='flex flex-col rounded-md'>
            {items.map((item, idx) => (
              <Menu.Item key={idx}>
                {({ active }) => (
                  <a
                    className='w-full px-2 py-1 duration-300 border-b border-gray-400 first:rounded-t-md last:rounded-b-md hover:bg-sky-500 ui-active:bg-sky-500 ui-active:text-inherit ui-not-active:bg-gray-700 ui-not-active:text-inherit hover:ease-in first:border-t last:border-b first:border-b-0 border-x'
                    {...item.props}
                  >
                    {item.label}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default Dropdown;
