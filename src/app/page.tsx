'use client';

import React, { useState, useEffect } from 'react';
import Preloader1 from './components/Preloader/PreLoader1';
import Header from './components/Header/Header';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasLoaded = localStorage.getItem('hasLoaded');

    if (hasLoaded) {
      setLoading(false); // Если загружали раньше, не показываем прелоадер
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
        localStorage.setItem('hasLoaded', 'true'); // Устанавливаем флаг
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) {
    return (
        <Preloader1 />
    );
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center">Добро пожаловать на наш завод!</h1>
        <p className="mt-4 text-center">
          Здесь будет информация о вашем заводе и данные, поступающие с датчиков.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
