
import React, {useState,useEffect, useLayoutEffect} from 'react';

//Acessar dados
import { useSelector, useDispatch} from 'react-redux';

import { 
    Box,
    Title,
    MarcarArea,
    BoxView
} from './styles';


export default ({data, index, onPress}) => {
   

    

    return (   
        <Box onPress={()=>onPress(index)}>
            <BoxView>
                <Title>
                    {data.item}
                </Title>
            </BoxView>
        </Box>
    );
}

