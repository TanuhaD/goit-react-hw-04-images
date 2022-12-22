import React, { Component } from 'react';
import { Searchbar, ImageGallery } from './';
import { ToastContainer, toast } from 'react-toastify';

export class App extends Component {
  state = {
    query: '',
  };

  setQuery = query => {
    this.setState({ query });
  };
  notify = msg =>
    toast(`🦄 ${msg}`, {
      position: 'bottom-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  render() {
    return (
      <div className="app">
        <Searchbar setQuery={this.setQuery} notifyFunc={this.notify} />
        <ImageGallery query={this.state.query} notifyFunc={this.notify} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
