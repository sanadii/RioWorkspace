const useTotalPrice = (serviceDetails) => {
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    serviceDetails.forEach((serviceItem) => {
      totalPrice += parseFloat(serviceItem.price) || 0;
    });
    return totalPrice.toFixed(2);
  };

  return calculateTotalPrice();
};

export { useTotalPrice };
