const initialState = " ";
const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return state = action.payload;
        default:
            return state
    }
}
const Userducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return state = action.payload;
        default:
            return state
    }
}

export default UserReducer;