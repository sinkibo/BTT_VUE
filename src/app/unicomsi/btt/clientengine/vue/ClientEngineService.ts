
import { Inject } from 'vue-property-decorator'
import { Store } from './Store';
import { Session } from './Session';
import { Flow } from './Flow';
import { ClientEngineService as CES } from "../service/ClientEngineService";

export { Store, Flow, Session };


export class ClientEngineService extends CES{

    @Inject('BTT') private __BTT: any;

    constructor( __BTT: any) {
        super(__BTT);
    }

    
}
