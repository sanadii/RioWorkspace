import { useEffect, useState } from "react";

const useGroupedServices = (services) => {
  const [groupedServices, setGroupedServices] = useState([]);

  useEffect(() => {
    const newGroupedServices = services && services.reduce((acc, service) => {
      // Find an existing category in the accumulator
      const category = acc.find((category) => category.label === service.categoryName);

      // Create the service option
      const serviceOption = {
        label: service.name,
        value: service.id,
        duration: service.duration,
        price: service.price,
      };

      if (category) {
        // If the category exists, push the new service into it
        category.options.push(serviceOption);
      } else {
        // Otherwise, create a new category with the service
        acc.push({
          label: service.categoryName,
          options: [serviceOption],
        });
      }

      return acc;
    }, []);

    setGroupedServices(newGroupedServices);
  }, [services]);

  return groupedServices;
};

export { useGroupedServices };
