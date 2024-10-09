'use client';

import React, { useState, useEffect } from 'react';
import Preloader1 from '../components/Preloader/PreLoader1';
import Header from '../components/Header/Header';
import HeroSection from '../components/HeroSection/HeroSection';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasLoaded = localStorage.getItem('hasLoaded'); // Проверяем, был ли сайт загружен ранее

    if (hasLoaded) {
      setLoading(false); // Если загружали раньше, не показываем прелоадер
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
        localStorage.setItem('hasLoaded', 'true'); // Устанавливаем флаг
      }, 2000); // Прелоадер будет показываться 2 секунды

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
      <HeroSection />
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
