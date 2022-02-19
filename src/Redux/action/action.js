
const loginUser = (user) => {
    return {
            type:"LOGIN",
            payload:user
        }
}

export default loginUser;
