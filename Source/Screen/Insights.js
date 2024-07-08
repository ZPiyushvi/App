import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { BarChart, PieChart } from 'react-native-gifted-charts';
import { LinearGradient } from 'expo-linear-gradient';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import Colors from '../Components/Colors';
import { Ionicons } from "@expo/vector-icons";
import { FoodTypeIconConfig } from '../Data/FoodTypeIconConfig';

const pieData1 = [
  { value: 70, color: '#177AD5' },
  { value: 30, color: 'lightgray' }
];

const pieData = [
  {
    value: 47,
    color: '#009FFF',
    gradientCenterColor: '#006DFF',
    // focused: true,
  },
  { value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
  { value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3' },
  { value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
];

const barDataDemo = [
  { value: 250, label: 'Mon' },
  { value: 500, label: 'Tue', frontColor: '#177AD5' },
  { value: 745, label: 'Wed', frontColor: '#177AD5' },
  { value: 320, label: 'Thu' },
  { value: 600, label: 'Fri', frontColor: '#177AD5' },
  { value: 256, label: 'Sat' },
  { value: 300, label: 'Sun' },
];

const data = [
  { value: 2500, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label: 'Jan' },
  { value: 2400, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },

  { value: 3500, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label: 'Feb' },
  { value: 3000, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },

  { value: 4500, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label: 'Mar' },
  { value: 4000, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },

  { value: 5200, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label: 'Apr' },
  { value: 4900, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },

  { value: 3000, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label: 'May' },
  { value: 2800, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },
];

export default function Insights() {
  const { dateGroup } = useContext(GlobalStateContext);

  function getLast7DaysLabels() {
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const today = new Date();
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      last7Days.push(days[day.getDay()]);
    }
    return last7Days;
  }

  function formatDataForBarPlot(data) {
    const today = new Date();
    const last7DaysTotals = new Array(7).fill(0);

    // Iterate over each entry in the data
    data.forEach(entry => {
      const entryDate = new Date(entry.Noformatdate); //entry.date => Monday, July 8th 2024
      const diffDays = Math.floor((today - entryDate) / (1000 * 60 * 60 * 24));

      if (diffDays >= 0 && diffDays < 7) {
        const dayIndex = 6 - diffDays;
        last7DaysTotals[dayIndex] += entry.total;
      }
    });

    // Prepare the bar data
    const last7DaysLabels = getLast7DaysLabels();
    const barData = last7DaysTotals.map((total, index) => ({
      value: total,
      label: last7DaysLabels[index],
      frontColor: '#4ABFF4' // Default color for bar data
    }));

    return barData;
  }

  const barData = formatDataForBarPlot(dateGroup);
  console.log(dateGroup);
  const categoryData = [
    { 'type': 'Veg', 'color': '#00e676' },
    { 'type': 'NonVeg', 'color': '#ff0000' },
    { 'type': 'Stationery', 'color': "#0092ff" },
    { 'type': 'Beverage', 'color': '#4ABFF4' },
    { 'type': 'Hot_Cafe', 'color': '#923c01' },
    { 'type': 'Cold_Cafe', 'color': '#c37960' },
    { 'type': 'Snacks', 'color': 'orange' },
    { 'type': 'Hot_Meal', 'color': '#ffb80e' },
    { 'type': 'Cold_Dessert', 'color': '#FF4191' },
    { 'type': 'Cold_Beverage', 'color': '#4ABFF4' },
    { 'type': 'Fresh', 'color': 'green' },
    { 'type': 'Hot_Snacks', 'color': '#ff611d' },
    { 'type': 'Bakery_Dessert', 'color': '#FF4191' },
    { 'type': 'Bakery_Bread', 'color': '#efa14b' },
  ];

  function formatDataForStackedBarPlot(data) {
    const today = new Date();
    const last7DaysTotals = new Array(7).fill(0);
    const last7DaysItems = new Array(7).fill(null).map(() => ({})); // Initialize each element with a separate object

    // Iterate over each entry in the data
    data.forEach(entry => {
      const entryDate = new Date(entry.Noformatdate);
      const diffDays = Math.floor((today - entryDate) / (1000 * 60 * 60 * 24));

      if (diffDays >= 0 && diffDays < 7) {
        const dayIndex = 6 - diffDays;

        entry.orders.forEach(order => {
          order.items.forEach(item => {
            const itemType = item.category;
            const itemPrice = parseFloat(item.price) * parseFloat(item.quantity); // Assuming price is a string, convert to float

            // Check if itemType exists in categoryData
            let categoryInfo = categoryData.find(category => category.type === itemType);

            // If itemType doesn't exist, assign it to 'Others' with gray color
            if (!categoryInfo) {
              categoryInfo = { type: 'Others', color: '#cccccc' }; // Gray color for others
            }

            // Initialize the item type if it doesn't exist for this day
            if (!last7DaysItems[dayIndex][categoryInfo.type]) {
              last7DaysItems[dayIndex][categoryInfo.type] = { total: itemPrice, color: categoryInfo.color };
            } else {
              last7DaysItems[dayIndex][categoryInfo.type].total += itemPrice; // Add to existing type's total
            }
          });
        });

        // Accumulate total for the day
        last7DaysTotals[dayIndex] += entry.total;
      }
    });

    // Prepare the stacked bar data
    const last7DaysLabels = getLast7DaysLabels();
    const stackData = last7DaysTotals.map((total, index) => {
      const stacks = Object.entries(last7DaysItems[index]).map(([type, { total, color }]) => ({
        value: total,
        color,
      }));

      // If stacks array is empty, add default stack
      if (stacks.length === 0) {
        stacks.push({
          value: 0,
          color: 'grey',
        });
      }

      return {
        stacks,
        label: last7DaysLabels[index]
      };
    });

    return stackData;
  }

  const barData2 = [
    {
      value: 40,
      label: 'Jan',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#177AD5',
    },
    { value: 20, frontColor: '#ED6665' },
    {
      value: 50,
      label: 'Feb',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#177AD5',
    },
    { value: 40, frontColor: '#ED6665' },
    {
      value: 75,
      label: 'Mar',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#177AD5',
    },
    { value: 25, frontColor: '#ED6665' },
    {
      value: 30,
      label: 'Apr',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#177AD5',
    },
    { value: 20, frontColor: '#ED6665' },
    {
      value: 60,
      label: 'May',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#177AD5',
    },
    { value: 40, frontColor: '#ED6665' },
    {
      value: 65,
      label: 'Jun',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#177AD5',
    },
    { value: 30, frontColor: '#ED6665' },
  ];



  const chartData = formatDataForStackedBarPlot(dateGroup);
  console.log('chartData', chartData);
  chartData.forEach((item) => {
    console.log(item)
  })

  // const renderDot = color => {
  //   return (
  //     <View
  //       style={{
  //         height: 10,
  //         width: 10,
  //         borderRadius: 5,
  //         backgroundColor: color,
  //         marginRight: 10,
  //       }}
  //     />
  //   );
  // };

  // const renderLegendComponent = () => {
  //   return (
  //     <>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           justifyContent: 'center',
  //           marginBottom: 10,
  //         }}>
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //             alignItems: 'center',
  //             width: 120,
  //             marginRight: 20,
  //           }}>
  //           {renderDot('#006DFF')}
  //           <Text style={{ color: 'white' }}>Excellent: 47%</Text>
  //         </View>
  //         <View
  //           style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
  //           {renderDot('#8F80F3')}
  //           <Text style={{ color: 'white' }}>Okay: 16%</Text>
  //         </View>
  //       </View>
  //       <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //             alignItems: 'center',
  //             width: 120,
  //             marginRight: 20,
  //           }}>
  //           {renderDot('#3BE9DE')}
  //           <Text style={{ color: 'white' }}>Good: 40%</Text>
  //         </View>
  //         <View
  //           style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
  //           {renderDot('#FF7F97')}
  //           <Text style={{ color: 'white' }}>Poor: 3%</Text>
  //         </View>
  //       </View>
  //     </>
  //   );
  // };
  const pieDataDemo = [
    { value: 40, color: '#009FFF', gradientCenterColor: '#006DFF', },
    { value: 60, color: 'rgba(147, 252, 248, 10)', gradientCenterColor: '#3BE9DE' },
  ];

  const [selectedOption, setSelectedOption] = useState('menu');

  return (
    <ScrollView style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>

      <View className='items-center py-8'>
        <View style={{ backgroundColor: Colors.dark.colors.componentColor }} className='flex-row w-2/5 rounded-full justify-center'>
          <TouchableOpacity activeOpacity={1} onPress={() => setSelectedOption('menu')}>
            <Text style={{ color: Colors.dark.colors.mainTextColor, backgroundColor: selectedOption === 'menu' ? Colors.dark.colors.diffrentColorOrange : Colors.dark.colors.componentColor }} className={`font-black text-base px-5 py-2 rounded-full`}>
              MenuWise
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={() => setSelectedOption('outlets')}>
            <Text style={{ color: Colors.dark.colors.mainTextColor, backgroundColor: selectedOption === 'outlets' ? Colors.dark.colors.diffrentColorOrange : Colors.dark.colors.componentColor }} className={`font-black text-base px-5 py-2 rounded-full`}>
              OutletsWise
            </Text>
          </TouchableOpacity>
        </View>
      </View>


      <View className='ml-5 mr-6 overflow-hidden'>
        <View className='mb-8 flex-row justify-between'>
          <View>
            <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-2xl'>This Week Details</Text>
            <Text style={{ color: Colors.dark.colors.textColor }} className='font-normal text-base'>Total money spend</Text>
          </View>
          <Ionicons name="calendar" size={24} color={Colors.dark.colors.mainTextColor} />
        </View>
        <BarChart
          disableScroll
          adjustToWidth
          isAnimated
          barWidth={16}
          spacing={25}
          noOfSections={5}
          initialSpacing={16}
          rulesColor={Colors.dark.colors.secComponentColor}
          yAxisThickness={0}
          xAxisThickness={0}
          // hideRules
          // autoShiftLabels
          data={barDataDemo}
          yAxisTextStyle={{ color: Colors.dark.colors.mainTextColor, fontSize: 14, fontWeight: 100 }}
          xAxisLabelTextStyle={{ color: Colors.dark.colors.textColor, fontSize: 14, fontWeight: 100 }}
          roundedBottom
          roundedTop
        // showReferenceLine1
        // referenceLine1Position={barData.reduce((sum, item) => sum + item.value / 2, 0) / barData.length}
        // referenceLine1Config={{
        //   color: 'gray',
        //   dashWidth: 2,
        //   dashGap: 3,
        // }}
        />

      </View>

      <View style={{ backgroundColor: Colors.dark.colors.componentColor }} className='m-4 flex-row px-6 py-4 rounded-3xl justify-between'>
        <View className='items-center justify-center'>
          <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-2xl'>Weeky {'\n'}Performance</Text>
          <Text style={{ color: Colors.dark.colors.textColor }} className='font-light text-base mt-2'>Total money spend</Text>
        </View>
        <PieChart
          data={pieDataDemo}
          donut
          showGradient
          sectionAutoFocus
          radius={45}
          innerRadius={30}
          innerCircleColor={Colors.dark.colors.componentColor}
          centerLabelComponent={() => {
            return (
              <View className=' flex-row justify-between items-end'>
                <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-2xl'>60</Text>
                <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-light text-xs'>%</Text>
              </View>
            );
          }}
        />
      </View>

      <View className='flex-row mx-4 justify-between'>
        <View style={{ backgroundColor: Colors.dark.colors.componentColor }} className='w-[44%] items-center justify-center rounded-2xl'>
          <View className=' items-center mb-2 justify-center h-10 w-10 rounded-full' style={{ backgroundColor: Colors.dark.colors.diffrentColorRed }}>
            <Ionicons name="bonfire" size={24} color={Colors.dark.colors.mainTextColor} />
          </View>
          <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-2xl'>2,000</Text>
          <Text style={{ color: Colors.dark.colors.textColor }} className='font-light text-base'>Kcal burnt</Text>
        </View>

        <View className='w-[56%] gap-3'>
          <View style={{ backgroundColor: Colors.dark.colors.componentColor }} className='flex-row rounded-2xl px-3 py-5 items-center justify-center'>
            <View className=' items-center mr-2 justify-center h-10 w-10 rounded-full' style={{ backgroundColor: Colors.dark.colors.diffrentColorPerple }}>
              <Ionicons name="water" size={24} color={Colors.dark.colors.mainTextColor} />
            </View>
            <View>
              <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-2xl'>10</Text>
              <Text style={{ color: Colors.dark.colors.textColor }} className='font-light text-base'>Glass water</Text>
            </View>
          </View>
          <View style={{ backgroundColor: Colors.dark.colors.componentColor }} className='flex-row rounded-2xl px-3 py-5 items-center justify-center'>
            <View className=' items-center mr-2 justify-center h-10 w-10 rounded-full' style={{ backgroundColor: Colors.dark.colors.diffrentColorGreen }}>
              <Ionicons name="walk" size={24} color={Colors.dark.colors.mainTextColor} />
            </View>
            <View>
              <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-2xl'>5,200</Text>
              <Text style={{ color: Colors.dark.colors.textColor }} className='font-light text-base'>Steps walked</Text>
            </View>
          </View>
        </View>
      </View>

      <View className=' flex-row mt-5'>
        <View className='w-6/12 ml-4' style={{ height: 232 }}>
          <View
            className='h-full w-40 rounded-2xl' style={{ backgroundColor: Colors.dark.colors.componentColor }}
          />
        </View>
        <View className='absolute' style={{ top: 16 }}>
          <PieChart
            data={pieData}
            donut
            focusOnPress
            extraRadiusForFocused={7}
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={'#232B5D'}
            centerLabelComponent={() => {
              return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text
                    style={{ fontSxize: 22, color: 'white', fontWeight: 'bold' }}>
                    47%
                  </Text>
                  <Text style={{ fontSize: 14, color: 'white' }}>Excellent</Text>
                </View>
              );
            }}
          />
        </View>

        <View className='w-5/12'>
        {Object.keys(FoodTypeIconConfig).map((key) => {
        const { label, iconName, bgColor, iconColor } = FoodTypeIconConfig[key];
        return (
          <View key={label} className='flex-row items-center mb-2'>
            <View className='items-center mr-2 justify-center h-8 w-8 rounded-full' style={{ backgroundColor: bgColor }}>
              <Ionicons name={iconName} size={24} color={iconColor} />
            </View>
            <View>
              <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-lg'>10</Text>
              <Text style={{ color: Colors.dark.colors.textColor }} className='font-light text-sm'>{label}</Text>
            </View>
          </View>
        );
      })}

        </View>

      </View>


      {console.log('barData', barData)}
      <View
        style={{
          paddingVertical: 100,
          backgroundColor: Colors.dark.colors.backGroundColor,
          flex: 1,
        }}>
        <BarChart
          textShiftX={10}
          data={barData2}
          barWidth={8}
          spacing={24}
          roundedTop
          roundedBottom
          hideRules
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{ color: 'gray' }}
          noOfSections={3}
          maxValue={75}
        />
        <View
          className='px-4'
          style={{
            // marginHorizontal: 40,
            // justifyContent: 'center',
            // alignItems: 'center',
            // padding: 16,
            // borderRadius: 20,
            backgroundColor: Colors.dark.colors.componentColor,
          }}>
          {/* <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            Overview
          </Text> */}

          <BarChart
            disableScroll
            adjustToWidth
            isAnimated
            barWidth={8}
            spacing={25}
            noOfSections={5}
            initialSpacing={5}
            rulesColor={Colors.dark.colors.backGroundColor}
            yAxisThickness={0}
            xAxisThickness={0}
            // hideRules
            autoShiftLabels
            stackData={chartData}
            yAxisTextStyle={{ color: 'gray', fontSize: 14 }}
            xAxisLabelTextStyle={{ color: 'gray', fontSize: 14, marginLeft: -5 }}//{{color: 'gray'}}
            stackBorderTopRightRadius={14}
            stackBorderTopLeftRadius={14}
            showReferenceLine1
            referenceLine1Position={20} //Avrage
            referenceLine1Config={{
              color: 'gray',
              dashWidth: 2,
              dashGap: 3,
            }}

          // showLine
          // lineConfig={{
          //   color: Colors.dark.colors.diffrentColorOrange,
          //   thickness: 3
          // }}
          />

        </View>

        <View
          style={{
            margin: 100,
            // padding: 106,
            borderRadius: 20,
            backgroundColor: Colors.dark.colors.componentColor,
          }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            Performance
          </Text>
          <View style={{ padding: 20, alignItems: 'center' }}>
            <PieChart
              data={pieData}
              donut
              showGradient
              sectionAutoFocus
              radius={90}
              innerRadius={60}
              innerCircleColor={'#232B5D'}
              centerLabelComponent={() => {
                return (
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text
                      style={{ fontSxize: 22, color: 'white', fontWeight: 'bold' }}>
                      47%
                    </Text>
                    <Text style={{ fontSize: 14, color: 'white' }}>Excellent</Text>
                  </View>
                );
              }}
            />
          </View>
          {/* {renderLegendComponent()} */}
        </View>
      </View>
    </ScrollView>
  );
}