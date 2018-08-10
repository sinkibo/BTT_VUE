
export class UserModel {
  isLoggedIn: boolean = false;
  _name: string | null = null;
  account_id: string = "BTT-User-1";
  password: string = "123456";
  _gender: string = "M";
  
  constructor() {}

  set gender(g: string){
    this._gender = g;
  }

  get photo(): string{
    return this._gender == "M" ? "../../static/images/man.jpg" : "../../static/images/woman.jpg";
  }

  get name(){
    return this._name || this.account_id;
  }

  set name(n: string){
    this._name = n;
  }

  reset(){
    this.isLoggedIn = false;
    this._name = null;
    this.account_id = "";
  }
}
