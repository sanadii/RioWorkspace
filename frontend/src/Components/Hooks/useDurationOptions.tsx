const useDurationOptions = () => {
  const generateDurationOptions = () => {
    const options = [];
    for (let i = 0; i <= 4 * 4; i++) {
      const hours = Math.floor(i / 4);
      const minutes = (i % 4) * 15;
      const totalMinutes = hours * 60 + minutes;
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      options.push({ id: totalMinutes, name: formattedTime, value: totalMinutes });
    }
    return options;
  };

  return generateDurationOptions();
};

export { useDurationOptions };
