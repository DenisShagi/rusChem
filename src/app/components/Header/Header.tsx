'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useAuth } from '../AuthContext/AuthContext'; 

axios.defaults.baseURL = 'http://172.16.3.40:8083';

const Header: React.FC = () => {
  const { login } = useAuth(); 
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [credentials, setCredentials] = useState({ usr: '', pwd: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [language, setLanguage] = useState('EN'); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Управление выпадающим меню

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setIsDropdownOpen(false); // Закрываем меню после выбора языка
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('/api/user/login', credentials); 
      if (response.status === 200) {
        login(response.data.token);
        setSuccessMessage('Авторизация успешна!');
        setShowLogin(false);
      } else {
        setError('Ошибка авторизации. Попробуйте снова.');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError('Ошибка сети. Попробуйте снова позже.');
      } else {
        setError('Неизвестная ошибка. Попробуйте снова.');
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('/register', credentials); 
      setSuccessMessage('Регистрация успешна! Пожалуйста, войдите.');
      setShowRegister(false); 
    } catch (err) {
      setError('Ошибка регистрации. Попробуйте снова.');
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <header className="relative bg-white shadow-md fixed w-full z-50 top-0">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Логотип */}
        <Link href="/">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={150} 
            height={40} 
            priority={true} // Для оптимизации LCP
            className="cursor-pointer"
          />
        </Link>

        {/* Навигационное меню */}
        <nav className="flex space-x-6">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <Link href="/services" className="hover:text-orange-500">Services</Link>
          <Link href="/about" className="hover:text-orange-500">About Us</Link>
          <Link href="/projects" className="hover:text-orange-500">Projects</Link>
          <Link href="/contact" className="hover:text-orange-500">Contact</Link>
        </nav>

        {/* Контейнер для кнопок */}
        <div className="flex items-center space-x-4">
          {/* Смена языка */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="hover:text-orange-500"
            >
              {language} <span className="ml-1">▼</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-20 bg-white border border-gray-300 rounded shadow-lg">
                <button 
                  onClick={() => handleLanguageChange('EN')} 
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  EN
                </button>
                <button 
                  onClick={() => handleLanguageChange('DE')} 
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  DE
                </button>
                <button 
                  onClick={() => handleLanguageChange('FR')} 
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  FR
                </button>
              </div>
            )}
          </div>

          {/* Кнопка "Contact" */}
          <Link href="/contact">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
              Contact
            </button>
          </Link>

          {/* Кнопка входа */}
          <button
            onClick={() => setShowLogin(true)}
            className="hover:text-orange-500"
          >
            Вход
          </button>
        </div>
      </div>

      {/* Успешное сообщение */}
      {successMessage && (
        <div className="fixed top-0 left-0 w-full flex items-center justify-center bg-green-500 text-white p-4">
          {successMessage}
        </div>
      )}

      {/* Форма входа */}
      {showLogin && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl mb-4">Вход</h2>
            {error && <p className="text-red-500">{error}</p>}
            <input
              type="text"
              name="usr"
              placeholder="Логин"
              value={credentials.usr}
              onChange={handleChange}
              className="border p-2 mb-2 w-full text-blue-500"
              required
            />
            <input
              type="password"
              name="pwd"
              placeholder="Пароль"
              value={credentials.pwd}
              onChange={handleChange}
              className="border p-2 mb-4 w-full text-blue-500"
              required
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Войти
            </button>
            <button
              type="button"
              onClick={() => setShowLogin(false)}
              className="text-red-500 mt-2"
            >
              Закрыть
            </button>
          </form>
        </div>
      )}

      {/* Форма регистрации */}
      {showRegister && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl mb-4">Регистрация</h2>
            {error && <p className="text-red-500">{error}</p>}
            <input
              type="text"
              name="usr"
              placeholder="Логин"
              value={credentials.usr}
              onChange={handleChange}
              className="border p-2 mb-2 w-full"
              required
            />
            <input
              type="password"
              name="pwd"
              placeholder="Пароль"
              value={credentials.pwd}
              onChange={handleChange}
              className="border p-2 mb-4 w-full"
              required
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Зарегистрироваться
            </button>
            <button
              type="button"
              onClick={() => setShowRegister(false)}
              className="text-red-500 mt-2"
            >
              Закрыть
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
