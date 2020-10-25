import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//pages
import ListScreen from '../pages/ListScreen';
import EditTodoScreen from '../pages/EditTodoScreen';



const MainStack = createStackNavigator();

export default () => (
    <MainStack.Navigator screenOptions={{
        headerStyle:{
            backgroundColor:'#222'
        },
        headerTintColor:'#FFF'
    }}>
        <MainStack.Screen name='List' component={ListScreen} />
        <MainStack.Screen name='EditTodo' component={EditTodoScreen} />
    </MainStack.Navigator>
);