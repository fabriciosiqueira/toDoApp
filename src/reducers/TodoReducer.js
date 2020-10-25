const initialState = {
    list:[
        
    ]
}

export default (state = initialState, action) => {
    
    let newList = [...state.list];


    switch(action.type) {
        case 'ADD_AFAZER':

            newList.push({
                title:action.payload.title,
                body:action.payload.body,
            })
            
        break;
        case 'EDIT_AFAZER':

            if(newList[action.payload.key]){
                newList[action.payload.key] = {
                    title:action.payload.title,
                    body:action.payload.body,
                };
            }
            
        break;
        case 'DEL_AFAZER':

            newList = newList.filter((item, index)=>index != action.payload.key);
            
        break;

    }

    return {...state, list:newList};
}