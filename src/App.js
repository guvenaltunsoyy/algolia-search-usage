import React, { useState } from 'react';
import './App.css';

const algoliasearch = require('algoliasearch');
const client = algoliasearch('YR9EHTUZLF', '0fa905cc79c37865c895cbd920b33420');
const index = client.initIndex('test_firstSearchIndex');

function App() {
  const [searchKey, setSearchKey] = useState("");
  const [show, setShow] = useState(false);
  const [results, setResults] = useState();

  function search() {
    if (searchKey === "") { return; }
    index.search({ 'query': searchKey })
      .then(({ hits } = {}) => {
        setResults(hits);
      }).catch(err => {
        console.log(err);
        console.log(err.debugData);
      });
  }

  return (
    <div className="App">
      <p>
        Algolia Search with firstname
      </p>
      <input type="text"
      placeholder="Search"
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            search(event);
            setShow(true);
          } else {
            setShow(false);
          }
        }}
        onChange={(event) => setSearchKey(event.target.value)} />
      {show && results !== undefined &&
        results.map((value, key) => {
          return <p key={key}>Firstname : {value.firstname} Lastname : {value.lastname}</p>
        })
      }
    </div>
  );
}

export default App;