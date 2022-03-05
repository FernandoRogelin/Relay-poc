import { Suspense } from 'react'

import './App.css';
import graphql from 'babel-plugin-relay/macro';
import {
  loadQuery,
  usePreloadedQuery,
  RelayEnvironmentProvider
} from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';

const RepositoryNameQuery = graphql`
  query AppRepositoryNameQuery {
    repository(owner: "facebook", name: "relay") {
      name
    }
  }
`;

const preloadedQuery = loadQuery(RelayEnvironment, RepositoryNameQuery, {
  /* query variables */
});

function App() {
  const data = usePreloadedQuery(RepositoryNameQuery, preloadedQuery);

  return (
    <div className="App">
      <header className="App-header">
        <p>Repository: {data.repository.name}</p>
      </header>
    </div>
  );
}

function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={'Loading...'}>
        <App />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
