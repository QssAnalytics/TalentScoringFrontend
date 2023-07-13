type ProgressBarType = {
  progress: number;
};

const ProgressBar = ({ progress = 0 }: ProgressBarType) => {
  return (
    <div className="relative h-[22px] w-full rounded-lg bg-qss-input">
      <div
        className="absolute h-full rounded-lg transition-all duration-500 bg-qss-secondary"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
