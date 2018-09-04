export default {
    changeDebugModel(state){
        console.info('change debug model from '+ state.isDevMode + " to " + !state.isDevMode);
        state.isDevMode = state.isDevMode ? false : true;
    },
    setMessage (state, _message) {
        state.message = _message
    },
    updateUserName (state, _username){
        state.auths.user.account_id = _username;
    },
    updatePWD (state, _password){
        state.auths.user.password = _password;
    },
    setIsLoggedIn (state, value){
        state.auths.user.isLoggedIn = value;
    },
    updateGender (state, value){
        state.auths.user.gender = value;
    },
    updateNick (state, value){
        state.auths.user.name = value;
    }
}