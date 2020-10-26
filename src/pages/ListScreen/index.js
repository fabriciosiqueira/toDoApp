import React, {useState,useEffect, useLayoutEffect} from 'react';
import { useNavigation } from '@react-navigation/native';

//Acessar dados
import { useSelector, useDispatch} from 'react-redux';

import {
    Container,
    AddButton,
    AddButtonImage,
    TodoList,
    NoTodo,
    NoTodoImage,
    NoTodoText

} from './styles';

//Import de componentes personalizados
import TodoItem from '../../components/TodoItem';

const API_URL = "https://b7web.com.br/todo/73986";

export default () => {

   

    

    //Hooks
    const navigation = useNavigation();
    const list = useSelector(state => state.todo.list);
    const dispatch = useDispatch();

    

    useEffect(()=>{
        fetch(API_URL)
        .then((r)=>r.json())
        .then((json)=>{
            
            dispatch({
                type: 'LIST_AFAZER',
                payload:{
                    list:json.todo
                }
            });

        })
    }, [list]);

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:'Seus Afazeres',
            headerRight: () => (
                <AddButton underlayColor='transparent' onPress={()=>navigation.navigate('EditTodo')}>
                    <AddButtonImage source={require('../../assets/more.png')} />
                </AddButton>
            )
        })
    }, []);

    
    
    const handleTodoPress = (index) => {
        console.log(index);
        navigation.navigate('EditTodo', {
            key: index,
        });
    }


    return (
        <Container>

            {list.length > 0 &&
                <TodoList 
                    data={list}
                    renderItem={({item,index})=>(
                        <TodoItem 
                            data={item}
                            index={index}
                            onPress={handleTodoPress}
                        />
                    )}
                    keyExtractor={(item, index)=>index.toString()}
                 /> 
            }

            {list.length == 0 &&
                <NoTodo>
                    <NoTodoImage source={require('../../assets/note.png')} />
                    <NoTodoText>
                        Na há nenhum afazer
                    </NoTodoText>
                </NoTodo>

            }
        </Container>
    );
}