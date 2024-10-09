import Image from 'next/image';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-blue-900 text-white h-screen flex items-center justify-center">

      <div className="absolute inset-0 z-0">
        <Image
          src="/factory-background.jpg" // Путь к твоему изображению фона
          alt="Factory Background"
          layout="fill"
          objectFit="cover"
          quality={90}
          className="opacity-80"
        />
      </div>

      {/* Контент поверх изображения */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">Civil Engineering Solutions<br />For The Cement Industry</h1>
        <p className="text-xl mb-6">
          We are your leading partner for complex brownfield construction projects during ongoing operation. <br />
          Benefit from engineering excellence built on more than 30 years of industry experience.
        </p>

        {/* Кнопки */}
        <div className="space-x-4">
          <Link href="/services">
            <div className="px-6 py-3 bg-white text-blue-900 font-semibold rounded-md cursor-pointer">
              How can we serve you
            </div>
          </Link>
          <Link href="/contact">
            <div className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 cursor-pointer">
              Contact Us
            </div>
          </Link>
        </div>
      </div>

      {/* Перекрывающиеся квадраты */}
      <div className="absolute bottom-20 right-20 flex space-x-4">
        <div className="w-32 h-32 bg-blue-700 text-center text-white flex items-center justify-center font-bold text-xl rotate-45">
          Ganzheitlich.
        </div>
        <div className="w-32 h-32 bg-blue-500 text-center text-white flex items-center justify-center font-bold text-xl rotate-45">
          Agil.
        </div>
        <div className="w-32 h-32 bg-orange-500 text-center text-white flex items-center justify-center font-bold text-xl rotate-45">
          Zuverlässig.
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
