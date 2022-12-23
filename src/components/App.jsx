import React, { useState } from 'react';
import { Searchbar, ImageGallery } from './';
import { ToastContainer } from 'react-toastify';
import { notify } from '../utils/notify';

const App = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="app">
      <Searchbar setQuery={setQuery} notifyFunc={notify} />
      <ImageGallery query={query} notifyFunc={notify} />
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default App;
