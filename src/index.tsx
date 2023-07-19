import ReactDOM from 'react-dom';

import './index.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { KeycloakProvider, PrivateAccess, PrivateRoute } from '@wf/keycloak-axios-provider';

import App from './components/App';

import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <KeycloakProvider configUrl={`${process.env.REACT_APP_PUBLIC_PATH}keycloak.json`}>
      <BrowserRouter>
        <PrivateAccess>
          <App />
        </PrivateAccess>
        <Routes>
          <Route path="*" element={<PrivateRoute />} />
        </Routes>
      </BrowserRouter>
    </KeycloakProvider>
  </Provider>,
  document.getElementById('root')
);

console.log('-----------------------------');
console.log(`Version: ${process.env.VERSION ?? '-'}`);
console.log(`Branch: ${process.env.BRANCH ?? '-'}`);
console.log(`CommitHash: ${process.env.COMMITHASH ?? '-'}`);
console.log(`PUBLIC_PATH: ${process.env.REACT_APP_PUBLIC_PATH ?? '-'}`);
console.log('-----------------------------');
