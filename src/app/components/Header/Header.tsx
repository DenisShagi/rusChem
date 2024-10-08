'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('/api/user/login', credentials); 
      console.log('Login successful:', response.data);
      login(response.data.token); 
      setSuccessMessage('Авторизация успешна!');
      setShowLogin(false);
    } catch (err) {
      setError('Неверные учетные данные. Попробуйте снова.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('/register', credentials); 
      console.log('Registration successful:', response.data);
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
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Завод Данных</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="relative group inline-block">
                <span className="group-hover:text-green-400 transition duration-300 ease-in-out">Главная</span>
                <span className="block w-full h-0.5 bg-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out mx-auto" />
              </Link>
            </li>
            <li>
              <Link href="/about" className="relative group inline-block">
                <span className="group-hover:text-green-400 transition duration-300 ease-in-out">О нас</span>
                <span className="block w-full h-0.5 bg-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out mx-auto" />
              </Link>
            </li>
            <li>
              <Link href="/contact" className="relative group inline-block">
                <span className="group-hover:text-green-400 transition duration-300 ease-in-out">Контакты</span>
                <span className="block w-full h-0.5 bg-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out mx-auto" />
              </Link>
            </li>
            <li>
              <button
                onClick={() => setShowLogin(true)}
                className="hover:text-green-400"
              >
                Вход
              </button>
            </li>
          </ul>
        </nav>
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
