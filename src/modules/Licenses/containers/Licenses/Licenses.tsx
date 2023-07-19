import { type FC, useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';

import { createArrFromObjKeysDependsKeyBoolean } from '../../../../helpers/createArrFromObjKeysDependsKeyBoolean';
import { createOptionsArrayFromStrArr } from '../../../../helpers/createOptionsArrayFromStrArr';
import { createOptionsArrayFromData } from '../../../../helpers/createOptionsArrayFromData';
import { FilterItems, type IFilterItem } from '../../../../components/Table/TableTypes';
import type { IGetLpcoParams, ILicensesProps } from './LicensesTypes';
import LicensesTBodyView from '../../components/LicensesTBodyView';

import { StatusesList } from '../../store/types';

import {
  licensesCountSelector,
  licensesSearchSelector,
  licensesSelector,
  newLicensesCountSelector,
  newLicensesSelector,
} from '../../store/selectors';
import { getLicensesApi, getLicenseTypesApi, getNewLicensesApi } from '../../store/actions';
import { lpcoSelectFields, statusesConfigs } from '../../configs';
import { PAGINATION_LIMIT } from '../../../../constatnts';

import styles from './Licenses.module.scss';

const Licenses: FC<ILicensesProps> = ({ title, emptyDataTitle, emptyDataText, lpcoBool }) => {
  const dispatch = useDispatch();
  const [licenseCodeSearchValue, setLicenseSearchCode] = useState('');
  const [searchLpcoOptions, setSearchLpcoOptions] = useState({
    licenseTypeCode: null,
    status: null,
  });
  const [licenseNReqStatusValue, setLicenseNReqStatusValue] = useState<SelectBaseOption>(null);

  const newLicensesState = useSelector(newLicensesSelector);
  const licensesState = useSelector(licensesSelector);
  const newLicensesCount = useSelector(newLicensesCountSelector);
  const licensesCount = useSelector(licensesCountSelector);
  const licensesSearchState = useSelector(licensesSearchSelector);

  const getStatuses = createArrFromObjKeysDependsKeyBoolean(statusesConfigs, lpcoBool);

  const getLpco = useCallback(
    ({
      limit = PAGINATION_LIMIT,
      offset = 0,
      selectFields,
      statusesConfigs,
      statusesConfigsBool,
      statusOption,
      lpcoTypeOption,
      func,
    }: IGetLpcoParams) => {
      dispatch(
        func({
          limit,
          offset,
          statusValue: statusOption?.value ?? '',
          lpcoTypeValue: lpcoTypeOption?.value ?? '',
          statusValues: createArrFromObjKeysDependsKeyBoolean(
            statusesConfigs,
            statusesConfigsBool
          ) as (keyof StatusesList)[],
          selectFields,
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    if (!lpcoBool) {
      getLpco({
        selectFields: lpcoSelectFields,
        statusesConfigs,
        statusesConfigsBool: true,
        statusOption: licenseNReqStatusValue,
        func: getNewLicensesApi,
      });
    }
  }, [getLpco, licenseNReqStatusValue, lpcoBool]);

  useEffect(() => {
    if (lpcoBool) {
      getLpco({
        selectFields: lpcoSelectFields,
        statusesConfigs,
        statusesConfigsBool: false,
        statusOption: searchLpcoOptions.status,
        lpcoTypeOption: searchLpcoOptions.licenseTypeCode,
        func: getLicensesApi,
      });
    }
  }, [getLpco, lpcoBool, searchLpcoOptions]);

  useEffect(() => {
    if (lpcoBool) {
      dispatch(getLicenseTypesApi({ licenseTypeValue: licenseCodeSearchValue }));
    }
  }, [dispatch, licenseCodeSearchValue, lpcoBool]);

  const handleLicenseCodeChange = useCallback(
    (value: string) => {
      setLicenseSearchCode(value);
    },
    [setLicenseSearchCode]
  );

  const handleLicenseNReqCodeValueChange = useCallback(
    (option: SelectBaseOption) => {
      setLicenseNReqStatusValue(option);
    },
    [setLicenseNReqStatusValue]
  );

  const handleLpcoChange = useCallback(
    (option: SelectBaseOption, selected: Record<string, SelectBaseOption>) => {
      setSearchLpcoOptions({
        ...searchLpcoOptions,
        [selected.name as string]: option,
      });
    },
    [setSearchLpcoOptions, searchLpcoOptions]
  );

  const tableNReqFilterItems: Array<IFilterItem<SelectBaseOption>> = [
    {
      field: FilterItems.select,
      placeholder: 'Choose a Status',
      selectChange: handleLicenseNReqCodeValueChange,
      options: createOptionsArrayFromStrArr(getStatuses, StatusesList),
      selectValue: licenseNReqStatusValue,
      name: 'status',
      id: 0,
    },
  ];

  const tableLPCOFilterItems: Array<IFilterItem<SelectBaseOption>> = [
    {
      field: FilterItems.select,
      placeholder: 'Choose a Status',
      selectChange: handleLpcoChange,
      options: createOptionsArrayFromStrArr(getStatuses, StatusesList),
      selectValue: searchLpcoOptions.status,
      name: 'status',
      id: 0,
    },
    {
      field: FilterItems.select,
      placeholder: 'Type of LPCO',
      selectChange: handleLpcoChange,
      onInputChange: handleLicenseCodeChange,
      options: createOptionsArrayFromData(licensesSearchState, 'licenseTypeCode', 'licenseTypeCode'),
      selectValue: searchLpcoOptions.licenseTypeCode,
      inputValue: licenseCodeSearchValue,
      name: 'licenseTypeCode',
      id: 1,
    },
  ];

  const handleNReqPageChange = (page: number) => {
    getLpco({
      offset: (page - 1) * PAGINATION_LIMIT,
      selectFields: lpcoSelectFields,
      statusesConfigs,
      statusesConfigsBool: !lpcoBool,
      statusOption: licenseNReqStatusValue,
      func: getNewLicensesApi,
    });
  };

  const handleLpcoPageChange = (page: number) => {
    getLpco({
      offset: (page - 1) * PAGINATION_LIMIT,
      selectFields: lpcoSelectFields,
      statusesConfigs,
      statusesConfigsBool: !lpcoBool,
      statusOption: searchLpcoOptions.status,
      lpcoTypeOption: searchLpcoOptions.licenseTypeCode,
      func: getLicensesApi,
    });
  };

  return (
    <div className={styles.table_container}>
      <h2>{title}</h2>
      <LicensesTBodyView
        handlePageChange={lpcoBool ? handleLpcoPageChange : handleNReqPageChange}
        tableFilterItems={lpcoBool ? tableLPCOFilterItems : tableNReqFilterItems}
        dataCount={lpcoBool ? licensesCount : newLicensesCount}
        data={lpcoBool ? licensesState : newLicensesState}
        emptyDataTitle={emptyDataTitle}
        emptyDataText={emptyDataText}
      />
    </div>
  );
};

export default Licenses;
