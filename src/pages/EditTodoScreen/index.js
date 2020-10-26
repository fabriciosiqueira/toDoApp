import React, {useState, useEffect, useLayoutEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';

import {
    Container,
    TitleInput,
    BodyInput,
    SaveButton,
    SaveButtonImage,
    CloseButton,
    CloseButtonImage,
    DeleteButton,
    DeleteButtonText,
    TrocarStatus
} from './styles';

const API_URL = "https://b7web.com.br/todo/73986";

export default () => {

    //hooks
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const list = useSelector( state => state.todo.list );
    

    //states
    const [item, setItem] = useState('');
    const [status, setStatus] = useState('new');

    useEffect(()=> {
        if(route.params?.key != undefined && list[route.params.key]) {
            setStatus('edit');
            setItem(list[route.params.key].item);
        }
    }, []);

    useLayoutEffect(()=> {
        navigation.setOptions({
            title: status == 'new' ? "Novo Afazer" : "Editar Afazer",
            headerLeft: () => (
                <CloseButton underlayColor='transparent' onPress={handleCloseButton}>
                    <CloseButtonImage source={require('../../assets/close.png')} />
                </CloseButton> 
            ),
            headerRight: () => (
                <SaveButton underlayColor='transparent' onPress={handleSaveButton}>
                    <SaveButtonImage source={require('../../assets/save.png')} />
                </SaveButton>
            )
        });
    }, [status, item]);

    const handleSaveButton = () => {
        if(item != "") {
            if(status == "edit") {
                dispatch({
                    type:"EDIT_AFAZER",
                    payload: {
                        key: route.params.key,
                        item,
                        
                    }
                });
                fetch(API_URL + "/" + list[route.params.key].id, {
                    method:'PUT',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        item
                    })
                })
                .then((r)=>r.json())
                .then((json)=>{
                    refreshList();
                }) 

            } else {

                //Storage
                dispatch({
                    type:"ADD_AFAZER",
                    payload: {
                        item
                        
                    }
                });

                //ADD na API
                fetch(API_URL, {
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        item
                    })
                })
                .then((r)=>r.json())
                .then((json)=>{
                    console.log("Added item",json.todo)
                    refreshList();
                })    

            }
            navigation.goBack();

        } else {
            alert('Preencha o Titulo');
        }
    }

   

    const handleCloseButton = () => {
        navigation.goBack();
    }

    const handleDeleteButton = () => {
        dispatch({
            type: 'DEL_AFAZER',
            payload:{
                key:route.params.key
            }
        });

        fetch(API_URL + "/" + list[route.params.key].id, {
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((r)=>r.json())
        .then((json)=>{
            refreshList();
        })


        navigation.goBack();
    }

    const refreshList = () => {
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
    }

    return (
        <Container>
           <TitleInput 
                value={item}
                onChangeText={t=>setItem(t)}
                placeholder="Digite o titulo da Tarefa"
                placeholderTextColor="#CCC"
                autoFocus={true}
           />
           
           {status == 'edit' &&
                

                <DeleteButton underlayColor='#FF0000'  onPress={handleDeleteButton}>
                    <DeleteButtonText>
                        Excluir
                    </DeleteButtonText>
                </DeleteButton>

              
           }
        </Container>
    );
}

