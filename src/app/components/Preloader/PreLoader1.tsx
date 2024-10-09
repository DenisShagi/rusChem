import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";

function PreLoader1() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasLoaded = localStorage.getItem('hasLoaded'); // Проверяем, был ли сайт загружен ранее

    if (hasLoaded) {
      setLoading(false); // Если страница уже была загружена, не показываем прелоадер
    } else {
      // Если первый раз, показываем прелоадер 2 секунды
      const timer = setTimeout(() => {
        setLoading(false);
        localStorage.setItem('hasLoaded', 'true'); // Устанавливаем флаг в localStorage, чтобы в будущем не показывать прелоадер
      }, 2000); // Показываем прелоадер 2 секунды

      return () => clearTimeout(timer); // Очищаем таймер при размонтировании компонента
    }
  }, []);

  return (
    <>
      {loading && (
        <div className="flex items-center justify-center h-screen bg-gray-900">
          <ReactLoading
            type={"bars"}
            color={"#03fc4e"}
            height={100}
            width={100}
          />
        </div>
      )}
    </>
  );
}

export default PreLoader1;
