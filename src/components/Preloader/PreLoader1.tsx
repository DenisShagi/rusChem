import React, { useEffect, useState } from "react";

function PreLoader1() {
  const [loading, setLoading] = useState(true);
  const [finishedWave, setFinishedWave] = useState(false);

  useEffect(() => {
    const hasLoaded = localStorage.getItem("hasLoaded"); // Проверяем, был ли сайт загружен ранее

    if (hasLoaded) {
      setLoading(false); // Если страница уже была загружена, не показываем прелоадер
    } else {
      // Если первый раз, показываем прелоадер и анимацию волны
      const timer = setTimeout(() => {
        setLoading(false);
        setFinishedWave(true); // Финальное состояние текста после волны
        localStorage.setItem("hasLoaded", "true"); // Устанавливаем флаг в localStorage
      }, 4000); 
      return () => clearTimeout(timer); // Очищаем таймер при размонтировании компонента
    }
  }, []);

  return (
    <>
      {loading && (
        <div className="flex items-center justify-center h-screen bg-gray-900">
          <div className={`text-6xl font-bold text-green-500 flex space-x-2`}>
            {["Р", "О", "С", "Х", "И", "М"].map((letter, index) => (
              <span
                key={index}
                className={`${
                  finishedWave
                    ? "animate-none scale-125"
                    : `animate-wave delay-${index * 200}ms`
                }`}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default PreLoader1;
