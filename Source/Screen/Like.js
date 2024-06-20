import moment from 'moment';
import { Text } from 'react-native';
import { View } from 'react-native';

// Sample data for the hotels
const hotel1 = {
  openingTime: "11:00 am",
  closingTime: "8:00 pm",
  offDays: "Thursday",
  leaveDay: "Thursday_Friday_Saturday",
  leaveReturnDay: "Saturday",
};

const hotel2 = {
  openingTime: "9:00 pm",
  closingTime: "9:00 am next day",
  offDays: "None",
  leaveDay: "None",
  leaveReturnDay: "Saturday",
};


const App = () => {

  const getStatus = (hotel) => {
    const currentTime = moment();
    const openingTime = moment(hotel.openingTime, ["h:mm A"]);
    const closingTime = moment(hotel.closingTime, ["h:mm A"]);
    const offDays = hotel.offDays;
    const leaveDays = hotel.leaveDay.split("_");

    {console.log(leaveDays)}
    const nextDay = (intialday) => {
      const nextDay = moment(intialday, ["dddd"]).add(1, 'days');
      return nextDay
    }

    if (leaveDays.includes(currentTime.format('dddd'))) {
      const lastIndex = leaveDays.length - 1;
      const backday = nextDay(leaveDays[lastIndex])
      return `Today Hotel is under maintenance. Will be back in process on ${backday}`;
    }

    if (currentTime.format('dddd') === offDays) {
      const backday = nextDay(offDays)
      return `Closed. Will open on ${backday}`;
    }

    // Check if the current time is before opening time
    else if (currentTime.isBefore(openingTime)) {
      const hoursUntilOpen = openingTime.diff(currentTime, 'hours');
      return `Closed. Will open in ${hoursUntilOpen} hours.`;
    }

    else if (currentTime.isAfter(closingTime)) {
      const hoursUntilOpen = openingTime.add(1, 'days').diff(currentTime, 'hours');
      return `Closed. Will open in ${hoursUntilOpen} hours.`;
    }

    else if (closingTime.diff(currentTime, 'minutes') <= 60) {
      return `Open. Closing soon.`;
    }

    return `Open.`;
  };

  // Example usage
  console.log(getStatus(hotel1));  // Output depends on the current time
  console.log(getStatus(hotel2));  // Output depends on the current time


  return (
    <View className=' w-full h-full justify-center items-center'>
      <Text>{getStatus(hotel1)}</Text>
      <Text>{getStatus(hotel2)}</Text>
    </View>
  );
};

export default App;
