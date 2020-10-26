const initialState = {
    list:[
        
    ]
}

export default (state = initialState, action) => {
    
    let newList = [...state.list];


    switch(action.type) {
        case 'ADD_AFAZER':

            newList.push({
                title:action.payload.item,
            })
            
        break;
        case 'EDIT_AFAZER':

            if(newList[action.payload.key]){
                newList[action.payload.key] = {
                    item:action.payload.item,
                };
            }
            
        break;
        break;
        case 'DEL_AFAZER':

            newList = newList.filter((item, index)=>index != action.payload.key);
            
        break;
        case 'LIST_AFAZER':

            newList = action.payload.list;
            
        break;

    }

    return {...state, list:newList};
}