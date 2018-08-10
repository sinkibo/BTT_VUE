export interface SubAccount{
    balance: string;
    card_id: string;
    card_type: string;
}

export interface AccountModel {
    account_id: string;
    cardList: SubAccount[];
    card_amount: number;
    contactForm: any;
    contactList: any;
    selectCardId: number;
    total_balance: string;
    transferForm: any;
   
}
