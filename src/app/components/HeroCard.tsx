import Image from 'next/image';

const HeroCard = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <Image
        src="/apple.svg"
        alt="Apple logo"
        width={80}
        height={80}
        priority
        className="dark:invert"
      />
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Welcome to Pick-a-Mac
      </h1>
      <p className="text-gray-700 dark:text-gray-300 text-center">
        Let us help you find the perfect Mac for your needs.
      </p>
    </div>
  );
};

export default HeroCard;
