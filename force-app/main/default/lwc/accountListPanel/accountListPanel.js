import { LightningElement, wire } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';

const actions = [
    { label: '詳細', name: 'show_details' },
    { label: '編集', name: 'edit' }
];

const columns = [
    { label: '取引先名', fieldName: 'name' },
    { label: '業種', fieldName: 'industry' },
    { label: '種別', fieldName: 'type' },
    { label: 'Web サイト', fieldName: 'website', type: 'url' },
    {
        type: 'action',
        typeAttributes: {
            rowActions: actions
        }
    }
]

export default class AccountListPanel extends NavigationMixin(LightningElement) {
    data = [];
    columns = columns;
    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        registerListener('accountListUpdate', this.handleAccountListUpdate, this);
    }

    disconnectedCallback() {
		unregisterAllListeners(this);
    }
    
    handleAccountListUpdate(accs){
        this.data = accs.map(acc => {
            return {
                name : acc.Name,
                industry : acc.Industry,
                type : acc.Type,
                website : acc.Website,
                id : acc.Id
            };
        })
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'show_details':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.id,
                        objectApiName: 'Account', // objectApiName is optional
                        actionName: 'view'
                    }
                });
                break;
            case 'edit':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.id,
                        objectApiName: 'Account', // objectApiName is optional
                        actionName: 'edit'
                    }
                });
                break;
            default:
                break;
        }
    }
}