import { type FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import LDocumentHistoryTBodyView from '../../components/LDocumentHistoryTBodyView';
import type { ILDocumentHistoryProps } from './LDocumentHistoryTypes';

import { documentHistorySelector } from '../../store/selectors';
import { getDocumentHistoryApi } from '../../store/actions';

import styles from './LDocumentHistory.module.scss';

const LDocumentHistory: FC<ILDocumentHistoryProps> = ({ id, emptyDataTitle, emptyDataText }) => {
  const dispatch = useDispatch();

  const documentHistoryState = useSelector(documentHistorySelector);

  useEffect(() => {
    dispatch(getDocumentHistoryApi({ documentId: id }));
  }, [dispatch, id]);

  return (
    <div className={styles.table_container}>
      <LDocumentHistoryTBodyView
        dataCount={documentHistoryState.length}
        emptyDataTitle={emptyDataTitle}
        emptyDataText={emptyDataText}
        data={documentHistoryState}
      />
    </div>
  );
};

export default LDocumentHistory;
