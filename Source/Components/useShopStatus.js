import { useState, useEffect } from 'react';
import moment from 'moment';
import Colors from './Colors';

const useShopStatus = (openingTime, closingTime, offDays, leaveDayString) => {
  const [status, setStatus] = useState({ text: '', color: [], state: '' });

  useEffect(() => {
    checkShopStatus(); // Initial check
    const interval = setInterval(() => {
      checkShopStatus();
    }, 60000); // Recheck every minute

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  const checkShopStatus = () => {
    const currentTime = moment().format('HH:mm');
    const leaveDays = leaveDayString.split('_');
    isShopOpen(currentTime, openingTime, closingTime, offDays, leaveDays, setStatus);
  };

  const isShopOpen = (currentTime, openingTime, closingTime, offDays, leaveDays, setStatus) => {
    const current = moment(currentTime, 'HH:mm');
    const opening = moment(openingTime, 'HH:mm');
    const closing = moment(closingTime, 'HH:mm').add(closingTime <= openingTime ? 1 : 0, 'days');

    if (leaveDays.includes(current.format('dddd'))) {
      setStatus({
        text: `Today, the shop is under maintenance. It will resume operations on ${moment(leaveDays[leaveDays.length - 1], 'dddd').add(1, 'days').format('dddd, MMMM Do YYYY')} at ${opening.format('h:mm A')}.`,
        color: ["#FF0000", Colors.dark.colors.backGroundColor], //"#6f0000"
        state: "closedForMaintenance"
      });
    } else if (current.format('dddd') === offDays) {
      setStatus({ text: `We're closed today. But don't worry and come back tomorrow.`, color: ["#FF0000", Colors.dark.colors.backGroundColor], state: "closed" });
    } else if (current.isBetween(opening, closing)) {
      setStatus({ text: "We're open and ready to serve! Dive into our menu now and enjoy a delicious meal!", color: ['#00FF00', '#1A4314'], state: "open" });
    } else {
      setStatus({ text: "Oops! You missed it! Closed for now, but we'll return tomorrow, same spot, same place", color: ["#FF0000",Colors.dark.colors.backGroundColor], state: "closed" });
    }
  };

  const getOpeningDifference = (currentTime, openingTime) => {
    const current = moment(currentTime, 'HH:mm');
    const opening = moment(openingTime, 'HH:mm');
    return opening.diff(current, 'minutes');
  };

  const getClosingDifference = (currentTime, closingTime) => {
    const current = moment(currentTime, 'HH:mm');
    const closing = moment(closingTime, 'HH:mm');
    return closing.diff(current, 'minutes');
  };

  // Calculate time differences
  const openingDifference = getOpeningDifference(moment().format('HH:mm'), openingTime);
  const closingDifference = getClosingDifference(moment().format('HH:mm'), closingTime);

  // Check for opening and closing soon statuses
  useEffect(() => {
    if (openingDifference > 0 && openingDifference <= 60) {
      setStatus({ text: `Almost there! Just ${openingDifference} minutes until the kitchen's back in action! Get ready to place your order!`, color: ["#f7ff00", '#DCE35B'], state: "openingSoon" });
    } else if (closingDifference > 0 && closingDifference <= 60) {
      setStatus({ text: `Hurry up! Kitchen's closing in ${closingDifference} minutes! Get your order in now before it's too late!`, color: ["#f7ff00", '#DCE35B'], state: "closingSoon" });
    }
  }, [openingDifference, closingDifference]);

  return status;
};

export default useShopStatus;
