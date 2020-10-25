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
    DeleteButtonText
} from './styles';

export default () => {

    //hooks
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const list = useSelector( state => state.todo.list );
    //console.log("list",list)

    //states
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [status, setStatus] = useState('new');


    useEffect(()=> {
        if(route.params?.key != undefined && list[route.params.key]) {
            setStatus('edit');
            setTitle(list[route.params.key].title);
            setBody(list[route.params.key].body);
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
    }, [status, title, body]);

    const handleSaveButton = () => {
        if(title != "") {
            if(status == "edit") {
                dispatch({
                    type:"EDIT_AFAZER",
                    payload: {
                        key: route.params.key,
                        title,
                        body
                    }
                });
            } else {
                dispatch({
                    type:"ADD_AFAZER",
                    payload: {
                        title,
                        body
                    }
                });
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

        navigation.goBack();
    }

    return (
        <Container>
           <TitleInput 
                value={title}
                onChangeText={t=>setTitle(t)}
                placeholder="Digite o titulo da Tarefa"
                placeholderTextColor="#CCC"
                autoFocus={true}
           />
           <BodyInput
                value={body}
                onChangeText={t=>setBody(t)}
                placeholder="Digite os detalhes da Tarefa"
                placeholderTextColor="#FFF"  
                multiline={true}
                textAlignVertical='top'
           
           />
           {status == 'edit' &&
                <DeleteButton underlayColor='#FF0000'  onPress={handleDeleteButton}>
                    <DeleteButtonText>
                        Afazer Finalizado - Excluir da Lista
                    </DeleteButtonText>
                </DeleteButton>

           }
        </Container>
    );
}