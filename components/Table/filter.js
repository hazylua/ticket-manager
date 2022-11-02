import TextInput from 'components/TextInput';
import { matchSorter } from 'match-sorter';
import { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

export function DefaultColumnFilter({ column: { filterValue, setFilter } }) {
  return (
    <TextInput
      value={filterValue ?? ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    />
  );
}

export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <TextInput
      placeholder={`Digite aqui para pesquisar entre ${count} itens.`}
      value={value || ''}
      onChange={(e) => {
        setValue(e.target.value || undefined);
        onChange(e.target.value);
      }}
    />
  );
}

/** @todo filterValue tem que ser 'string' ou 'any'?  */
export function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, {
    keys: [(row) => row.values[id[0]]],
  });
}

fuzzyTextFilterFn.autoRemove = (val) => !val;

export function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id[0]];
    return rowValue >= filterValue;
  });
}
