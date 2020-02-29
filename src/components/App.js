import React from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import Container from './content/container';

export default ({ children }) => {
  return (
    <div>
      <Header/>
      {children}
      <Container/>
      <Footer/>
    </div>
  );
};
