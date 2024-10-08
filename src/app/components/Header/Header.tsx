'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Header: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('/api/login', credentials);
      console.log('Login successful:', response.data);
      setShowLogin(false); // Закрываем форму после успешного входа
      // Здесь вы можете добавить логику для сохранения токена или состояния входа
    } catch (err) {
      setError('Неверные учетные данные. Попробуйте снова.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('/api/register', credentials);
      console.log('Registration successful:', response.data);
      setShowRegister(false); // Закрываем форму после успешной регистрации
      // Здесь вы можете добавить логику для перенаправления пользователя или входа
    } catch (err) {
      setError('Ошибка регистрации. Попробуйте снова.');
    }
  };

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

      {/* Форма входа */}
      {showLogin && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl mb-4">Вход</h2>
            {error && <p className="text-red-500">{error}</p>}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              className="border p-2 mb-2 w-full text-blue-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={credentials.password}
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
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              className="border p-2 mb-2 w-full"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={credentials.password}
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
