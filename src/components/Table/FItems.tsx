import type { FC } from 'react';

import { DatePicker, Input, Select, Table } from '@wf/components';

import type { IFItemProps } from './TableTypes';
import { FilterItems } from './TableTypes';

import styles from './Table.module.scss';

const FItems: FC<IFItemProps> = ({ filterItems }) => (
  <Table.Search className={styles.filters_content}>
    {filterItems?.map((item) => {
      switch (item.field) {
        case FilterItems.input:
          return (
            <div className={styles.filters_item} key={item.id}>
              <Input onChange={item.onChange} placeholder={item.placeholder} value={item.value} />
            </div>
          );
        case FilterItems.select:
          return (
            <div className={styles.filters_item} key={item.id}>
              <Select
                onInputChange={item.onInputChange}
                placeholder={item.placeholder}
                onChange={item.selectChange}
                inputValue={item.inputValue}
                value={item.selectValue}
                onFocus={item.onFocus}
                options={item.options}
                name={item.name}
                isClearable
              />
            </div>
          );
        case FilterItems.datepicker:
          return (
            <div className={styles.filters_item} key={item.id}>
              <DatePicker
                onChange={
                  item.datePickerChange ??
                  function datePickerChange() {
                    console.log('datePickerChange');
                  }
                }
                placeholderText={item.placeholder}
                className={styles.date_picker}
                value={item.datePickerValue}
                format="dd - mm - yyyy"
                isClearable
              />
            </div>
          );
        default:
          return null;
      }
    })}
  </Table.Search>
);

export default FItems;
