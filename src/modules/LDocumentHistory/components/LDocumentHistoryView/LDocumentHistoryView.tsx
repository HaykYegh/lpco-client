import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { Status } from '@wf/components';

import ContentContainer from '../../../../components/ContentContainer';
import LDocumentHistoryViewTexts from './LDocumentHistoryViewTexts';
import LDocumentHistory from '../../containers/LDocumentHistory';
import { StatusesList } from '../../../Licenses/store/types';
import { appPaths } from '../../../../constatnts/appPaths';
import Header from '../../../../components/Header';

import { removeLastWordStartUnderline } from '../../../../helpers';
import { documentHistorySelector } from '../../store/selectors';

import styles from './LDocumentHistoryView.module.scss';

const LDocumentHistoryView: FC = () => {
  const { id } = useParams();
  const headerLink = `${appPaths.indexPath}edit/${id as string}`;
  const documentHistoryState = useSelector(documentHistorySelector);
  const dataCount = documentHistoryState.length;
  const currentStatus = documentHistoryState[dataCount - 1]?.status;

  return (
    <div className={styles.container}>
      <Header
        title={
          <div className={styles.title_content}>
            <h2>{LDocumentHistoryViewTexts.TITTLE}</h2>
            {currentStatus && (
              <Status color="success">
                {StatusesList[currentStatus as keyof typeof StatusesList] ??
                  removeLastWordStartUnderline(currentStatus)}
              </Status>
            )}
          </div>
        }
        link={headerLink}
      />
      <ContentContainer>
        <LDocumentHistory
          emptyDataTitle={LDocumentHistoryViewTexts.DOCUMENT_HISTORY_EMPTY_DATA_TITLE}
          emptyDataText={LDocumentHistoryViewTexts.DOCUMENT_HISTORY_EMPTY_DATA_DESC}
          id={id as string}
        />
      </ContentContainer>
    </div>
  );
};

export default LDocumentHistoryView;
