// useRecentServices.js

import { useState, useEffect } from 'react';
import moment from 'moment';

const useRecentServices = (expenses) => {
  const [recentAppointments, setRecentAppointments] = useState([]);

  const getLast7Days = () => {
    return [...Array(7)].map((_, i) => {
      return moment().subtract(i, 'days').format('YYYY-MM-DD');
    }).reverse();
  };

  useEffect(() => {
    if (expenses && expenses.length > 0) {
      const last7Days = getLast7Days();
      const filteredAppointments = last7Days.map(date => {
        const appointmentData = expenses.find(rev => rev.date === date);
        return appointmentData || {
          date,
          notes: "No data",
          cash: 0,
          credit: 0,
          link: "",
          other: 0,
          status: "",
        };
      });
      setRecentAppointments(filteredAppointments);
    }
  }, [expenses]);

  return recentAppointments;
};

export default useRecentServices;
