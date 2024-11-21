import React from 'react';
import './Library.css';
import Navbar3 from '../../components/navbar3';

const Library = () => {
  return (
    <div className="library-container">
        <Navbar3 />
      <header className="library-header">
        <h1>Check All Books</h1>
      </header>
      <main className="library-content">
        {/* Open-source library iframe */}
        <iframe
          src="https://openlibrary.org/"
          title="Open Library"
          className="library-iframe"
          frameBorder="0"
        ></iframe>
      </main>
    </div>
  );
};

export default Library;