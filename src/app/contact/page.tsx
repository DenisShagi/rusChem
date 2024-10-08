import React from 'react';
import Header from '../components/Header/Header';

const ContactPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center">Контакты</h1>
        <p className="mt-4 text-center">
          Здесь будет информация для связи с нашей компанией.
        </p>
      </div>
    </div>
  );
};

export default ContactPage;