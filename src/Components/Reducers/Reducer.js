const initialState = {
    subId: '',
    email: '',
    userName: '',
    isLogged : false
}

const Reducer = (state = initialState, action) => {
	if(action.type === 'SET_USER_DATA'){
		return {
			...state,
            agentId: action.agentId,
            clientId: action.clientId,
            associationId: action.associationId,
            clientName : action.clientName
		}
	}

	return state;
}
export default Reducer;