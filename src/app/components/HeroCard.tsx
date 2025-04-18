import Image from 'next/image';

const HeroCard = () => {
  return (
    <div>
      <Image
        src="/apple.svg"
        alt="Apple logo"
        width={80}
        height={80}
        priority
        className="dark:invert"
      />
    </div>
  );
};

export default HeroCard;
