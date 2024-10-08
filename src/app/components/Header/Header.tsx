'use client';

import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Завод Данных</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:text-green-400">Главная</Link></li>
            <li><Link href="/about" className="hover:text-green-400">О нас</Link></li>
            <li><Link href="/contact" className="hover:text-green-400">Контакты</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;