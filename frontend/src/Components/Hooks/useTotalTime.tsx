const useTotalTime = (serviceDetails) => {
  const calcualteTotalTime = () => {
    let totalTimeDuration = 0;
    serviceDetails.forEach((serviceItem) => {
      totalTimeDuration += parseFloat(serviceItem.duration) || 0;
    });

    const hours = Math.floor(totalTimeDuration / 60);
    const minutes = totalTimeDuration % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };

  return calcualteTotalTime();
};

export { useTotalTime };
