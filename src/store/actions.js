export const login = ({ state, commit }) => {
    return new Promise((resolve, reject) => {
        commit('setMessage','Trying to log in ...');
        state.auths.login().then(() => {
            let flow = state.auths._btt.getFlow();
            let store = flow.getStore();
            commit("setIsLoggedIn","LoginState" != flow.getState());
            if(state.auths.isLoggedIn){
                commit("updateNick",store.getValueAt("name"));
                commit("updateGender",store.getValueAt("gender"));
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                let redirect = state.auths.redirectUrl ? state.auths.redirectUrl : '/myAccount';

                // Set our navigation extras object
                // that passes on our global query params and fragment
                //let navigationExtras: NavigationExtras = {
                //queryParamsHandling: 'preserve',
               // };

                // Redirect the user
                //this.$router.push({ path: redirect });
                resolve(redirect);
            }else{
                commit('setMessage',store.getValueAt("message"));
                reject();
            }
        }).catch(
            (reason) => {
                commit('setMessage',reason.message ? reason.message : "Failed to login, please try again!");
                reject();
            }
        );
    });  
}

export const logout = ({ state, commit }) => {
    return new Promise((resolve, reject) => {
        commit('setMessage','Trying to log out ...');
        state.auths.logout().then(() => {
            commit("setIsLoggedIn",false);
            commit("updateNick",null);
            commit("updateUserName","BTT-User-1");
            window.alert("You're now logged out!");
            commit('setMessage','');
            resolve("/home");
        }).catch(
            (reason) => {
                commit('setMessage',reason.message ? reason.message : "Failed to logout, please try again!");
                reject();
            }
        );
    });  

}

export const changeDebugModel = ({ commit }) => {
    commit('changeDebugModel');
}
