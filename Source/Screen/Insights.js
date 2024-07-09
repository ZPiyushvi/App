import { View, Text, ScrollView, TouchableOpacity, ImageBackground, Dimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import { BarChart, PieChart } from 'react-native-gifted-charts';
import { LinearGradient } from 'expo-linear-gradient';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import Colors from '../Components/Colors';
import { Ionicons } from "@expo/vector-icons";
import { FoodTypeIconConfig } from '../Data/FoodTypeIconConfig';
import { formatDate } from '../Components/formatDate';

const pieDataDemo = [
  { value: 40, color: '#009FFF', gradientCenterColor: '#006DFF', },
  { value: 60, color: 'rgba(147, 252, 248, 10)', gradientCenterColor: '#3BE9DE' },
];

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

export default function Insights() {
  const { dateGroup } = useContext(GlobalStateContext);

  function getLast7DaysLabels() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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

    data.forEach(entry => {
      const entryDate = new Date(entry.Noformatdate); //entry.date => Monday, July 8th 2024
      const diffDays = Math.floor((today - entryDate) / (1000 * 60 * 60 * 24));

      if (diffDays >= 0 && diffDays < 7) {
        const dayIndex = 6 - diffDays;
        last7DaysTotals[dayIndex] += entry.total;
      }
    });

    // Color based on top 3
    const indicesWithValues = last7DaysTotals.map((value, index) => ({ value, index }));
    indicesWithValues.sort((a, b) => b.value - a.value);
    const top3Indices = indicesWithValues.slice(0, 3).map(item => item.index);

    const last7DaysLabels = getLast7DaysLabels();
    const barData = last7DaysTotals.map((total, index) => ({
      value: total,
      label: last7DaysLabels[index],
      frontColor: top3Indices.includes(index) ? '#177AD5' : 'black'
    }));

    return barData;
  }

  function formatDataForStackedBarPlot(data) {
    const today = new Date();
    const last7DaysTotals = new Array(7).fill(0);
    const last7DaysItems = new Array(7).fill(null).map(() => ({}));

    data.forEach(entry => {
      const entryDate = new Date(entry.Noformatdate);
      const diffDays = Math.floor((today - entryDate) / (1000 * 60 * 60 * 24));

      if (diffDays >= 0 && diffDays < 7) {
        const dayIndex = 6 - diffDays;

        entry.orders.forEach(order => {
          order.items.forEach(item => {
            const itemType = item.category;
            const itemPrice = parseFloat(item.price) * parseFloat(item.quantity);
            let categoryInfo = categoryData.find(category => category.type === itemType);

            // If itemType doesn't exist, assign it to 'Others'
            if (!categoryInfo) {
              categoryInfo = { type: 'Others', color: '#cccccc' };
            }

            if (!last7DaysItems[dayIndex][categoryInfo.type]) {
              last7DaysItems[dayIndex][categoryInfo.type] = { total: itemPrice, color: categoryInfo.color };
            } else {
              last7DaysItems[dayIndex][categoryInfo.type].total += itemPrice; // Add to existing type's total
            }
          });
        });

        last7DaysTotals[dayIndex] += entry.total;
      }
    });

    // stacked bar data format
    const last7DaysLabels = getLast7DaysLabels();
    const stackData = last7DaysTotals.map((total, index) => {
      const stacks = Object.entries(last7DaysItems[index]).map(([type, { total, color }]) => ({
        value: total,
        color,
      }));
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

  function formatDataForPiePlot(data) {
    const today = new Date();
    const todayFormatted = formatDate(today);
    const result = {};

    data.forEach(entry => {
      if (entry.date === todayFormatted) { // only for present date
        entry.orders.forEach(order => {
          order.items.forEach(item => {
            const itemType = item.category;
            const itemPrice = parseFloat(item.price) * parseFloat(item.quantity);
            const iconConfig = FoodTypeIconConfig.find(config => config.catagory === itemType);

            if (result[itemType]) {
              result[itemType].totalPrice += itemPrice;
              result[itemType].items.push(item);
            } else {
              result[itemType] = {
                totalPrice: itemPrice,
                items: [item],
                iconConfig: iconConfig || {}
              };
            }
          });
        });
      }
    });
    return result;
  }

  const transformToPieData = (processedData) => {
    return Object.keys(processedData).map(categoryKey => {
      const categoryData = processedData[categoryKey];
      const totalValue = categoryData.totalPrice;
      const color = categoryData.iconConfig.bgColor;
      const gradientCenterColor = categoryData.iconConfig.gradientCenterColor || color;

      return {
        value: totalValue,
        color: color,
        gradientCenterColor: gradientCenterColor
      };
    });
  };

  // Calculating total AmountSpend and totalQuantity
  var totalOrders = 0;
  var totalSpend = 0;
  var totalQuantity = 0;
  dateGroup.map((item) => {
    totalSpend += item.total;
    totalOrders = item.orders.length;
    item.orders.map((orders) => {
      orders.items.map((items) => {
        totalQuantity += parseInt(items.quantity, 10);
      })
    })
  });

  // {console.log('dateGroup', dateGroup)}
  const barFormatData = formatDataForBarPlot(dateGroup);
  const pieData = formatDataForPiePlot(dateGroup);
  const pieFormatData = transformToPieData(pieData);
  const stackedBarFormatData = formatDataForStackedBarPlot(dateGroup);

  const [selectedOption, setSelectedOption] = useState('menu');
  const [selectedStackBar, setSelectedStackBark] = useState(false);
  const [detailsVisibility, setDetailsVisibility] = useState({});

  const handlePress = (categoryKey) => {
    setDetailsVisibility((prevState) => ({
      ...prevState,
      [categoryKey]: !prevState[categoryKey],
    }));
  };

  return (
    <>
      {dateGroup.length == 0 &&
        <View className=' h-full justify-center items-center p-2' style={{ backgroundColor: Colors.dark.colors.backGroundColor, height: Dimensions.get('window').height * 0.8 }}>
          <Ionicons name={'thumbs-down'} size={42} color={Colors.dark.colors.mainTextColor} />
          <Text className='font-black text-xl text-center py-3' style={{ color: Colors.dark.colors.mainTextColor }}>No Orders Yet? Seriously?</Text>
          <Text className='font-normal text-base text-center' style={{ color: Colors.dark.colors.textColor }}>
            You haven't placed any orders yet. Don't miss out on our amazing items! Go ahead and fill up this space with delicious memories!
          </Text>
        </View>
      }
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

        {/* -------------------------- Bar Chart -------------------------- */}
        <View className='ml-5 mr-6 overflow-hidden'>
          <View className='mb-8 flex-row justify-between'>
            <View>
              <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-2xl'>This Week Details</Text>
              <Text style={{ color: Colors.dark.colors.textColor }} className='font-normal text-base'>Total expenditure</Text>
            </View>
            <TouchableOpacity onPress={() => { setSelectedStackBark(!selectedStackBar) }}>
              <Ionicons name="calendar" size={24} color={Colors.dark.colors.mainTextColor} />
            </TouchableOpacity>
          </View>
          {selectedStackBar ?
            <BarChart
              data={barFormatData}

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
              yAxisTextStyle={{ color: Colors.dark.colors.mainTextColor, fontSize: 14, fontWeight: 100 }}
              xAxisLabelTextStyle={{ color: Colors.dark.colors.textColor, fontSize: 14, fontWeight: 100 }}
              roundedBottom
              roundedTop
            // showReferenceLine1
            // referenceLine1Position={barFormatData.reduce((sum, item) => sum + item.value / 2, 0) / barFormatData.length}
            // referenceLine1Config={{
            //   color: 'gray',
            //   dashWidth: 2,
            //   dashGap: 3,
            // }}
            />
            :
            <BarChart

              stackData={stackedBarFormatData}

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
              yAxisTextStyle={{ color: Colors.dark.colors.mainTextColor, fontSize: 14, fontWeight: 100 }}
              xAxisLabelTextStyle={{ color: Colors.dark.colors.textColor, fontSize: 14, fontWeight: 100 }}
              stackBorderRadius={14}
              // barBorderTopLeftRadius={12}
              roundedTop
              roundedBottom
            // roundedTop
            // showReferenceLine1
            // referenceLine1Position={barFormatData.reduce((sum, item) => sum + item.value / 2, 0) / barFormatData.length}
            // referenceLine1Config={{
            //   color: 'gray',
            //   dashWidth: 2,
            //   dashGap: 3,
            // }}

            // showLine
            // lineConfig={{
            //   color: Colors.dark.colors.diffrentColorOrange,
            //   thickness: 3
            // }}
            />
          }
        </View>
        {/* -------------------------- Bar Chart -------------------------- */}

        <View style={{ backgroundColor: Colors.dark.colors.componentColor }} className='m-4 flex-row px-6 py-4 rounded-3xl justify-between'>
          <View className='items-center justify-center'>
            <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-2xl'>Weeky {'\n'}Performance</Text>
            <Text style={{ color: Colors.dark.colors.textColor }} className='font-light text-base mt-2'>Average Expenditure</Text>
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

        <View className=' m-4 flex-row justify-between'>
            <View>
              <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-2xl'>This Month Details</Text>
              <Text style={{ color: Colors.dark.colors.textColor }} className='font-normal text-base'>Total expenditure</Text>
            </View>
            <TouchableOpacity onPress={() => { setSelectedStackBark(!selectedStackBar) }}>
              <Ionicons name="calendar" size={24} color={Colors.dark.colors.mainTextColor} />
            </TouchableOpacity>
          </View>

        <View className='flex-row mx-4 justify-between'>
          <View className='w-[56%] gap-3'>
            <View style={{ backgroundColor: Colors.dark.colors.componentColor }} className='flex-row rounded-2xl px-3 py-5 items-center justify-center'>
              <View className=' items-center mr-2 justify-center h-10 w-10 rounded-full' style={{ backgroundColor: Colors.dark.colors.diffrentColorPerple }}>
                <Ionicons name="cart" size={24} color={Colors.dark.colors.mainTextColor} />
              </View>
              <View>
                <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-2xl'>{totalOrders}</Text>
                <Text style={{ color: Colors.dark.colors.textColor }} className='font-light text-base'>Orders Placed</Text>
              </View>
            </View>
            <View style={{ backgroundColor: Colors.dark.colors.componentColor }} className='flex-row rounded-2xl px-3 py-5 items-center justify-center'>
              <View className=' items-center mr-2 justify-center h-10 w-10 rounded-full' style={{ backgroundColor: Colors.dark.colors.diffrentColorGreen }}>
                <Ionicons name="archive" size={24} color={Colors.dark.colors.mainTextColor} />
              </View>
              <View>
                <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-2xl'>{totalQuantity}</Text>
                <Text style={{ color: Colors.dark.colors.textColor }} className='font-light text-base'>Items Bought</Text>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: Colors.dark.colors.componentColor }} className='w-[44%] items-center justify-center rounded-2xl'>
            <View className=' items-center mb-2 justify-center h-10 w-10 rounded-full' style={{ backgroundColor: Colors.dark.colors.diffrentColorRed }}>
              <Ionicons name="wallet" size={24} color={Colors.dark.colors.mainTextColor} />
            </View>
            <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-2xl'>{totalSpend}</Text>
            <Text style={{ color: Colors.dark.colors.textColor }} className='font-light text-base'>Money Spent</Text>
          </View>
        </View>


        <View style={{ backgroundColor: Colors.dark.colors.componentColor }} className='mt-4 mx-4 flex-row px-6 py-4 rounded-3xl justify-between'>
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

        <View className=' m-4 flex-row justify-between'>
            <View>
              <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-2xl'>This Week Details</Text>
              <Text style={{ color: Colors.dark.colors.textColor }} className='font-normal text-base'>Total expenditure</Text>
            </View>
            <TouchableOpacity onPress={() => { setSelectedStackBark(!selectedStackBar) }}>
              <Ionicons name="calendar" size={24} color={Colors.dark.colors.mainTextColor} />
            </TouchableOpacity>
          </View>

        {/* -------------------------- Pie Chart -------------------------- */}
        {pieFormatData.length == 0 ?
          <View className='p-2' />
          :
          <View className=' flex-row m-4 justify-between'>
            <View style={{ height: 232 }}>
              <View
                className='h-full w-36 rounded-2xl' style={{ backgroundColor: Colors.dark.colors.componentColor }}
              />
            </View>
            <View className='absolute -ml-4' style={{ top: 16 }}>
              <PieChart
                data={pieFormatData}
                donut
                focusOnPress
                extraRadiusForFocused={7}
                showGradient
                sectionAutoFocus
                radius={90}
                innerRadius={60}
                innerCircleColor={Colors.dark.colors.componentColor}
                centerLabelComponent={() => {
                  return (
                    <View className='items-center'>
                      <View className=' flex-row items-center'>
                        <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-4xl'>
                          {Object.values(pieData).reduce((acc, category) => acc + category.totalPrice, 0)}
                        </Text>
                        <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-normal text-lg'> Rs</Text>
                      </View>
                      <Text style={{ color: Colors.dark.colors.textColor }} className='font-light text-sm -mt-2'> Total Spend</Text>
                    </View>
                  );
                }}
              />
            </View>

            <View className='w-[52%] -z-10'>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={170} /* Set the width + margin between items */
                decelerationRate='fast'
              >
                {Object.keys(pieData).map((categoryKey, index) => {
                  const categoryData = pieData[categoryKey];
                  const showDetails = false || detailsVisibility[categoryKey];

                  return (
                    <TouchableOpacity
                      activeOpacity={0.6}
                      key={index}
                      className="-z-10"
                      style={{ width: 170 }}
                      onPress={() => handlePress(categoryKey)}
                    >
                      <View key={index} className="rounded-2xl" style={{ height: 232, backgroundColor: Colors.dark.colors.componentColor }}>
                        {showDetails ? (
                          // <View style={{ backgroundColor: Colors.dark.colors.componentColor }} className="flex-row rounded-2xl pt-5 pb-2 items-center justify-center">
                          //   <View className="items-center mr-2 justify-center h-10 w-10 rounded-full" style={{ backgroundColor: categoryData.iconConfig.bgColor }}>
                          //     <Ionicons name={categoryData.iconConfig.iconName} size={24} color={categoryData.iconConfig.iconColor} />
                          //   </View>
                          //   <View>
                          //     <Text style={{ color: Colors.dark.colors.mainTextColor }} className="font-black text-2xl">{categoryKey}</Text>
                          //     <Text style={{ color: Colors.dark.colors.textColor }} className="font-light text-base">Total: {categoryData.totalPrice} Rs</Text>
                          //   </View>
                          // </View>
                          categoryData.items.map((item, itemIndex) => (
                            <View className='pt-2 px-2 justify-center items-center'>

                              <View className='flex-row justify-between'>
                                <Text style={{ color: Colors.dark.colors.mainTextColor }} className="font-light text-xl">{item.item}</Text>
                              </View>
                              <View className='flex-row'>
                                <Text className='font-black text-sm' style={{ color: Colors.dark.colors.textColor }}>Quantity X {item.quantity} = </Text>
                                <Text className='font-black text-sm' style={{ color: Colors.dark.colors.diffrentColorOrange }}>₹{item.price * item.quantity}</Text>
                              </View>
                            </View>
                          ))
                        ) : (
                          <View style={{ backgroundColor: Colors.dark.colors.componentColor }} className="h-full items-center justify-center rounded-2xl">
                            <View className="items-center mr-2 justify-center h-10 w-10 rounded-full" style={{ backgroundColor: categoryData.iconConfig.bgColor }}>
                              <Ionicons name={categoryData.iconConfig.iconName} size={24} color={categoryData.iconConfig.iconColor} />
                            </View>
                            <Text style={{ color: Colors.dark.colors.mainTextColor }} className="font-black text-2xl">{categoryKey}</Text>
                            <Text style={{ color: Colors.dark.colors.textColor }} className="font-light text-base">Your Total: {categoryData.totalPrice} Rs</Text>
                            <Text style={{ color: Colors.dark.colors.textColor }} className="font-light text-sm absolute bottom-2 underline right-3">Click to see Details</Text>
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        }

      </ScrollView>
    </>
  );
}
