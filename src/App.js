
import React  from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BoxSearch } from './views/BoxSearch';
import { ResultSearch } from './views/ResultSearch';

const App = () => {

    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<BoxSearch />} />
          <Route path="/items/:search" element={<ResultSearch />} />
        </Routes>
      </BrowserRouter>
    );
};

export default App;