import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Checkbox from 'components/Checkbox';
import NumberInput from 'components/NumberInput';
import Select from 'components/Select';
import Spinner from 'components/Spinner';
import { cloneDeep } from 'lodash';
import {
  Fragment,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  useExpanded,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';

import TableOverlay from './TableOverlay';
import { DefaultColumnFilter, GlobalFilter, fuzzyTextFilterFn } from './filter';

function PageButton({ children, ...props }) {
  return (
    <button
      className='flex items-center px-2 py-1 mr-2 duration-200 ease-in bg-white border rounded border-slate-300 hover:bg-neutral-200 disabled:bg-neutral-200 disabled:text-neutral-400'
      {...props}
    >
      {children}
    </button>
  );
}

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    if (resolvedRef.current?.indeterminate) {
      resolvedRef.current.indeterminate = indeterminate;
    }
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <Checkbox ref={resolvedRef} {...rest} />
    </>
  );
});
IndeterminateCheckbox.displayName = IndeterminateCheckbox;

/**
 * Tabela básica.
 * @see https://spectrum.chat/react-table/general/toggling-filter-visibility~f4c83c72-c631-4fa0-93ea-e9a7daa31fbd
 */
function Table({
  columnDefs,
  tableData,
  isLoading,
  isFetching,
  tablePageSizes,
  handleSelectedRows,
  enableGlobalFilter = false,
}) {
  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    [],
  );

  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    [],
  );

  const tableInstance = useTable(
    {
      columns: columnDefs,
      data: tableData,
      initialState: { pageIndex: 0, pageSize: tablePageSizes[0] },
      filterTypes,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      // hooks.visibleColumns.push((columns) => [
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          // Header: ({ getToggleAllPageRowsSelectedProps }) => (
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div className='flex items-center justify-center w-full h-fit'>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div className='flex justify-center w-full h-fit'>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    },
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    filteredRows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    nextPage,
    previousPage,
    gotoPage,
    setPageSize,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    selectedFlatRows,
    state: { expanded, pageIndex, pageSize, globalFilter },
  } = tableInstance;

  useEffect(() => {
    if (selectedFlatRows) {
      handleSelectedRows(selectedFlatRows);
    }
  }, [handleSelectedRows, selectedFlatRows]);

  const [visibleFilters, setVisibleFilters] = useState([]);
  const toggleFilter = (
    // id: Array<IdType<any>>
    id,
  ) => {
    const update = cloneDeep(visibleFilters);
    const index = update.indexOf(id);
    index < 0 ? update.push(id) : update.splice(index, 1);
    setVisibleFilters(update);
  };

  const rowsPerPageChangeHandler = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    gotoPage(0);
  };

  const pageChangeHandler = (e) => {
    gotoPage(e.target.value - 1);
  };

  const EmptyRow = (props) => {
    return (
      <tr {...props}>
        {new Array(visibleColumns.length).fill(undefined).map((...[, idx]) => (
          <td role='cell' key={idx}>
            &nbsp;
          </td>
        ))}
      </tr>
    );
  };

  const getTableStatus = () => {
    return (isLoading || isFetching) && tableData.length > 0 ? (
      <Spinner className='w-10 h-10 text-sky-500' />
    ) : null;
  };

  return (
    <>
      <div className='relative w-full'>
        <div>
          {enableGlobalFilter ? (
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          ) : null}
          <div className='w-full overflow-x-auto shadow-none whitespace-nowrap'>
            <table
              {...getTableProps()}
              aria-label='table'
              className='w-full table-auto'
            >
              <thead>
                {headerGroups.map((group, idx) => (
                  <Fragment key={idx}>
                    <tr
                      {...group.getHeaderGroupProps()}
                      className='border-b bg-neutral-100'
                    >
                      {group.headers.map((column, idx) => (
                        <th key={idx} className='p-2 text-sm uppercase'>
                          <div
                            aria-label='cell-header-container'
                            className='flex items-center justify-between flex-grow gap-2 '
                          >
                            <div
                              {...column.getHeaderProps(
                                column.getSortByToggleProps({
                                  title: 'Sortable',
                                }),
                              )}
                              className={clsx(
                                column.id !== 'selection' &&
                                  'flex items-center flex-grow gap-2 bg-inherit  rounded px-2 py-1 ease-in duration-200',
                                column.canSort &&
                                  'cursor-pointer hover:bg-sky-400/25',
                                'w-full',
                              )}
                            >
                              {column.render('Header')}

                              <div className='flex flex-col'>
                                {column.id === 'expander' ||
                                !column.canSort ? null : column.isSorted ? (
                                  column.isSortedDesc ? (
                                    <>
                                      <ChevronDownIcon className='w-5 h-auto' />
                                    </>
                                  ) : (
                                    <>
                                      <ChevronUpIcon className='w-5 h-auto' />
                                    </>
                                  )
                                ) : null}
                              </div>
                            </div>

                            {column.canFilter ? (
                              <div
                                title='Pesquisar'
                                className={clsx(
                                  'relative flex items-center justify-center cursor-pointer justify-self-end',
                                  visibleFilters.indexOf(column.id) >= 0
                                    ? 'text-inherit'
                                    : 'text-neutral-400',
                                )}
                                onClick={() => toggleFilter(column.id)}
                              >
                                <MagnifyingGlassIcon className='w-5 h-auto duration-200 ease-in' />
                                <div
                                  // transform: 'translate(-50%, -50%)',
                                  className='box-content absolute flex w-full h-full p-1 duration-200 ease-in -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 hover:bg-sky-400/25'
                                />
                              </div>
                            ) : null}
                          </div>
                        </th>
                      ))}
                    </tr>

                    {visibleFilters.length > 0 ? (
                      <tr className='border-b bg-neutral-100'>
                        {group.headers.map((column, idx) => (
                          <th className='p-2 w-fit ' key={idx}>
                            {column.canFilter &&
                            visibleFilters.indexOf(column.id) >= 0
                              ? column.render('Filter')
                              : null}
                          </th>
                        ))}
                      </tr>
                    ) : null}
                  </Fragment>
                ))}
              </thead>

              <tbody
                sx={{
                  position: 'relative',
                }}
              >
                <TableOverlay
                  rowsFiller={new Array(pageSize - page.length)
                    .fill(undefined)
                    .map((...[, idx]) => (
                      <EmptyRow key={idx} />
                    ))}
                  info={getTableStatus()}
                >
                  {page.map((row, idx) => {
                    prepareRow(row);
                    const { key, ...rowProps } = row.getRowProps({ key: idx });
                    return (
                      <tr
                        key={key}
                        {...rowProps}
                        className='duration-200 ease-in border-b hover:bg-neutral-200'
                      >
                        {row.cells.map(({ key, ...cell }) => {
                          return (
                            <td
                              key={key}
                              {...cell.getCellProps()}
                              className='p-2'
                            >
                              {cell.render('Cell')}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </TableOverlay>
              </tbody>
            </table>
          </div>
        </div>
        <nav aria-label='Paginação' className='w-full mt-4'>
          <ul className='flex items-center justify-end px-4 py-2 rounded pagination'>
            <li>
              <PageButton
                disabled={!canPreviousPage}
                onClick={() => gotoPage(0)}
              >
                <ChevronDoubleLeftIcon className='w-4 h-fit' />
              </PageButton>
            </li>
            <li>
              <PageButton
                disabled={!canPreviousPage}
                onClick={() => previousPage()}
              >
                <ChevronLeftIcon className='w-4 h-fit' />
              </PageButton>
            </li>

            <li className='p-2 page-item'>
              <div className='gap-2 d-flex text-muted align-items-center font-weight-bold'>
                <span>
                  Items: <span className='text-primary'>{rows.length}</span>
                </span>
              </div>
            </li>

            <li className='p-2'>
              <span className='flex items-center gap-2 align-items-center'>
                <span>Page:</span>
                <NumberInput
                  // disabled={pageIndex + 1}
                  value={pageIndex + 1}
                  onChange={pageChangeHandler}
                  className='w-16'
                />
                <span>of {pageCount}</span>
              </span>
            </li>

            <li className='p-2 page-item'>
              <span className='flex items-center gap-2 align-items-center'>
                <span>Size:</span>
                <Select
                  value={pageSize}
                  onChange={rowsPerPageChangeHandler}
                  options={tablePageSizes.map((size, idx) => ({
                    value: size,
                    label: size,
                  }))}
                />
              </span>
            </li>

            <li className={clsx('page-item', !canNextPage && 'disabled')}>
              <PageButton disabled={!canNextPage} onClick={() => nextPage()}>
                <ChevronRightIcon className='w-4 h-auto' />
              </PageButton>
            </li>
            <li className='page-item'>
              <PageButton
                disabled={!canNextPage}
                onClick={() => gotoPage(pageCount - 1)}
              >
                <ChevronDoubleRightIcon className='w-4 h-auto' />
              </PageButton>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Table;
