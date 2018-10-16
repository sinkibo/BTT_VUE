import { Store } from './Store';

export class Flow {
    private _store: Store = null;
    constructor(private _flow: any = null) {}

    changeEvent(eventName: String, input?: any, context?: any): Promise<any> {
        return this._flow ? new Promise((resolve,reject)=>{
            this._flow.changeEvent(eventName, input, resolve, function (tresp, tflow, tef) {
                reject({
                    "response": tresp,
                    "flow": tflow,
                    "errorFields": tef
                });
            }, context);
        }): null;
    }
    execOperation(operationName: String, input: any, context?: any): Promise<any> {
        return this._flow ? new Promise((resolve,reject)=>{
            this._flow.execOperation(operationName, input, resolve, reject, context);
        }) : null;
    }

    getName(): string {
        return this._flow ? this._flow.getName() : null;
    }
    getState(): string {
        return this._flow ? this._flow.getState() : null;
    }
    getStore(): Store {
        if(this._flow && (this._store == null)){
            this._store = new Store(this._flow.getStore());
        }
        return this._store;
    }
}
