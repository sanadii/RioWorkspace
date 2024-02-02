// useRecentDailyRevenues.js

import { useState, useEffect } from 'react';
import moment from 'moment';

const useRecentDailyRevenues = (dailyRevenues) => {
  const [recentRevenues, setRecentRevenues] = useState([]);

  const getLast7Days = () => {
    return [...Array(7)].map((_, i) => {
      return moment().subtract(i, 'days').format('YYYY-MM-DD');
    }).reverse();
  };

  useEffect(() => {
    if (dailyRevenues && dailyRevenues.length > 0) {
      const last7Days = getLast7Days();
      const filteredRevenues = last7Days.map(date => {
        const revenueData = dailyRevenues.find(rev => rev.date === date);
        return revenueData || {
          date,
          notes: "No data",
          cash: 0,
          credit: 0,
          link: "",
          other: 0,
          status: "",
        };
      });
      setRecentRevenues(filteredRevenues);
    }
  }, [dailyRevenues]);

  return recentRevenues;
};

export default useRecentDailyRevenues;
