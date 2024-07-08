import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { BarChart, PieChart } from 'react-native-gifted-charts';
import { LinearGradient } from 'expo-linear-gradient';

const pieData1 = [
  { value: 70, color: '#177AD5' },
  { value: 30, color: 'lightgray' }
];

const pieData = [
  {
    value: 47,
    color: '#009FFF',
    gradientCenterColor: '#006DFF',
    focused: true,
  },
  { value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
  { value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3' },
  { value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
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

const stackData = [
  {
    stacks: [
      { value: 10, color: 'orange' },
      { value: 20, color: '#4ABFF4', marginBottom: 2 },
    ],
    label: 'Jan',
  },
  {
    stacks: [
      { value: 10, color: '#4ABFF4' },
      { value: 11, color: 'orange', marginBottom: 2 },
      { value: 15, color: '#28B2B3', marginBottom: 2 },
    ],
    label: 'Mar',
  },
  {
    stacks: [
      { value: 14, color: 'orange' },
      { value: 18, color: '#4ABFF4', marginBottom: 2 },
    ],
    label: 'Feb',
  },
  {
    stacks: [
      { value: 7, color: '#79C3DB' },
      { value: 11, color: '#28B2B3', marginBottom: 2 },
      { value: 10, color: '#4ABFF4', marginBottom: 2 },
    ],
    label: 'Mar',
  },
];

const barData = [
  { value: 230, label: 'Jan', frontColor: '#4ABFF4' },
  { value: 180, label: 'Feb', frontColor: '#79C3DB' },
  { value: 195, label: 'Mar', frontColor: '#28B2B3' },
  { value: 250, label: 'Apr', frontColor: '#4ADDBA' },
  { value: 320, label: 'May', frontColor: '#91E3E3' },
];

export default function Insights() {

  const renderDot = color => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}>
            {renderDot('#006DFF')}
            <Text style={{ color: 'white' }}>Excellent: 47%</Text>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
            {renderDot('#8F80F3')}
            <Text style={{ color: 'white' }}>Okay: 16%</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}>
            {renderDot('#3BE9DE')}
            <Text style={{ color: 'white' }}>Good: 40%</Text>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
            {renderDot('#FF7F97')}
            <Text style={{ color: 'white' }}>Poor: 3%</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <ScrollView>
      <View
        style={{
          paddingVertical: 100,
          backgroundColor: '#34448B',
          flex: 1,
        }}>

        <View
          style={{
            margin: 10,
            padding: 16,
            borderRadius: 20,
            backgroundColor: '#232B5D',
          }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            Overview
          </Text>
          <BarChart
          barBorderRadius={1}
          // spacing={40}
            stackData={stackData}
            barWidth={10}
            noOfSections={3}
            
            frontColor="lightgray"
            data={barData}
            yAxisThickness={0}
            xAxisThickness={0}

            referenceLine1Position={20} //Avrage
              referenceLine1Config={{
                color: 'gray',
                dashWidth: 2,
                dashGap: 3,
              }}
              
              showLine
              lineConfig={{
                color: '#F29C6E',
                thickness: 3,
                curved: true,
                hideDataPoints: true,
                shiftY: 6,
                // initialSpacing: -30,
              }}

              hideRules

              isAnimated
              showReferenceLine1
          />
          <View style={{ padding: 20, alignItems: 'center' }}>
            <BarChart
              barWidth={22}
              noOfSections={3}
              barBorderRadius={4}
              frontColor="lightgray"
              data={barData}
              yAxisThickness={0}
              xAxisThickness={0}
              
              
              
              hideRules

              isAnimated
              showReferenceLine1
              
              
              referenceLine1Position={120} //Avrage
              referenceLine1Config={{
                color: 'gray',
                dashWidth: 2,
                dashGap: 3,
              }}
              
              showLine
              lineConfig={{
                color: '#F29C6E',
                thickness: 3,
                curved: true,
                hideDataPoints: true,
                shiftY: 6,
                // initialSpacing: -30,
              }}
            />
          </View>
        </View>

        <View
          style={{
            margin: 20,
            padding: 16,
            borderRadius: 20,
            backgroundColor: '#232B5D',
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
          {renderLegendComponent()}
        </View>
      </View>
    </ScrollView>
  );
}