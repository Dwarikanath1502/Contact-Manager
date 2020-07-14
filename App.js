import React from 'react';

//importing navigation

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//importing Screens

import HomeScreen from './screens/HomeScreen';
import AddNewContactScreen from './screens/AddNewContactScreen';
import EditContactScreen from './screens/EditContactScreen';
import ViewContactScreen from './screens/ViewContactScreen';



const Stack = createStackNavigator();

function App(){
 return(
  <NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen 
      name = 'Contact Manager'
      component = {HomeScreen}
      options={{
        headerTintColor:'#fff',
        headerStyle:{
          backgroundColor:'#B83227'
        }  
      }}
     />
     <Stack.Screen  
       name = 'Add'
       component = {AddNewContactScreen}
       options={{
         headerTintColor:'#fff',
         headerStyle:{
           backgroundColor:'#B83227'
         }  
       }}
     />
     <Stack.Screen  
       name = 'Edit'
       component = {EditContactScreen}
       options={{
         headerTintColor:'#fff',
         headerStyle:{
           backgroundColor:'#B83227'
         }  
       }}
     />
     <Stack.Screen  
       name = 'View'
       component = {ViewContactScreen}
       options={{
         headerTintColor:'#fff',
         headerStyle:{
           backgroundColor:'#B83227'
         }  
       }}
     />
  </Stack.Navigator>
</NavigationContainer>
 );
}

export default App;