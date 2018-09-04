import { UserModel } from "./user-model";
import { ClientEngineService, Store } from '../app/unicomsi/btt/clientengine/vue/ClientEngineService';
import { Flow } from "../app/unicomsi/btt/clientengine/vue/Flow";

export class AuthService {
  private _btt: ClientEngineService;
  private _user: UserModel;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(_btt: ClientEngineService, _user: UserModel){
    this._btt = _btt;
    this._user = _user;
  }

  login(): Promise<any> {
    // establish session
    return this._btt.establishSession()
    .then(
      ()=>{
        return this._btt.launchFlow("LoginFlow");
      }
    )
    .then(
      (store) => {
        let flow: Flow = this._btt.getFlow();
        return flow.changeEvent("login", this._user);
      }
    )
    .catch(
      (reason)=>{
        if (!reason.message && reason.errorFields)
        {
          reason.message = "Validation failed, please check your input!";
        }
        return Promise.reject(reason);
      }
    );

    // return Observable.of(this.isLoggedIn);
  }

  logout(): Promise<any> {
    if (!window.confirm("Do you really want to leave?")) return;

    return this._btt.destroySession()
  }

  get user() : UserModel {
    return this._user;
  }
  
  get isLoggedIn(): boolean {
    return this._user.isLoggedIn;
  }

  set isLoggedIn(v: boolean) {
    this._user.isLoggedIn =v;
  }
}