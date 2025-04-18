type StartButtonProps = {
  onClick: () => void;
};

const StartButton = ({ onClick }: StartButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium 
                 hover:bg-blue-700 active:scale-95 transition-all"
    >
      Help me pick a Mac
    </button>
  );
};

export default StartButton;
