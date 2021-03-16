import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,Image,Dimensions,Animated, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {Countries} from './Countries'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SharedElement } from 'react-native-shared-element';
import {} from 'react-native-screens'

const {height,width} = Dimensions.get('screen')
const ITEM_HEIGHT = Math.floor(height*0.45)
const ITEM_WIDTH = Math.floor(width *0.66)
const SPACEING = 10
const FULL_SIZE = ITEM_WIDTH +(SPACEING * 2)

const Stack = createStackNavigator();

const TravelDetails = ({navigation,route}) => {
  const item = route.params

  return (
     <View>
         <Image
              source = {item.item.image}
              style={{ width ,height ,resizeMode : 'cover',borderRadius : 10}}
         />

           <Animated.Text style={{ position: 'absolute',top : SPACEING *4,left: SPACEING,fontSize : 30,color : 'white' , fontWeight : '800' , width : ITEM_WIDTH, }}
           numberOfLines = {1}
           >
             {item.item.City},
            </Animated.Text>

            <Animated.Text style={{ position: 'absolute',top : SPACEING*7,left: SPACEING,fontSize : 50,color : 'white' , fontWeight : '800' , width : ITEM_WIDTH,
                           textTransform : 'uppercase',
                         }}>
              {item.item.Country}
            </Animated.Text>

            
     </View>
  )
}

const TravelCarousel = ({navigation}) => {


  const scrollX = React.useRef(new Animated.Value(0)).current
  const [pressed,setPressed ]= React.useState(false)
  return (
    <View style={styles.container}>
       <Animated.FlatList
          data = {Countries}
          horizontal
          keyExtractor = {({item},index) => {return index}}
          snapToInterval = {FULL_SIZE}
          bounces = {false}
          showsHorizontalScrollIndicator = {false}
          decelerationRate ={ 'fast'}
          onScroll = {Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver : true}
            )}
          contentContainerStyle = {{ justifyContent : 'center',alignItems : 'center'}}
          
          renderItem = {({item, index}) => {
           
      const  inputRange = [FULL_SIZE*(index-1),FULL_SIZE*(index),FULL_SIZE*(index+1)]
      const translateX =  scrollX.interpolate({
             inputRange,
             outputRange : [FULL_SIZE,0,-FULL_SIZE]
      })
  
      const scale = scrollX.interpolate({
         inputRange,
         outputRange : [0,1,0]
      })
    if(item.image){
      return (
        <TouchableOpacity onPress = {() => setPressed(true)}>
        <View style={{ marginHorizontal : SPACEING,shadowColor : 'black',shadowOpacity : 0.6}}>
            <Image
              source = {item.image}
              style={{ width : ITEM_WIDTH,height : ITEM_HEIGHT,resizeMode : 'cover',borderRadius : 10}}
            />

            <Animated.Text style={{ position: 'absolute',top : SPACEING,left: SPACEING,fontSize : 20,color : 'white' , fontWeight : '800' , width : ITEM_WIDTH,
                         transform : [{translateX,scale}]
                         }}>
             {item.City},
            </Animated.Text>

            <Animated.Text style={{ position: 'absolute',top : SPACEING*3.5,left: SPACEING,fontSize : 30,color : 'white' , fontWeight : '800' , width : ITEM_WIDTH,
                           textTransform : 'uppercase', transform : [{translateX,scale}]
                         }}>
              {item.Country}
            </Animated.Text>

            <View style ={{ width : 50,height : 50,borderRadius : 50, position : 'absolute',backgroundColor : 'tomato',bottom : 10,left : 10,alignItems : 'center',justifyContent : 'center'}}>
              <Text style ={{ fontWeight : "700",fontSize : 20,color : 'white'}}>{item.Days}</Text>
              <Text style ={{ fontWeight : "700",fontSize : 12,color : 'white'}}>Days</Text>
            </View>
        </View>
        </TouchableOpacity>
        )
    }
    else if(item.image === undefined){
      return <View style={{
        width : width-FULL_SIZE-20 , marginHorizontal : SPACEING}}/>
    }

          }}
       />
  </View>
    
  );
}



export default function App() {

  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions ={{headerShown : false , cardStyle : {
     
    }}}>
      <Stack.Screen name="TravelCarousel" component={TravelCarousel} /> 
      <Stack.Screen name="TravelDetails" component={TravelDetails} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
