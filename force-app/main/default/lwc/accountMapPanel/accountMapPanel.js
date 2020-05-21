import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';

export default class AccountMapPanel extends LightningElement {
    mapMarkers = [];
    center = {
        location: { Latitude: '40.7831856',
                    Longitude: '-73.9675653' }};
    
    @wire(CurrentPageReference) pageRef;
    
    connectedCallback() {
		// subscribe to accountMapUpdate event
		registerListener('accountMapUpdate', this.handleaccountMapUpdate, this);
    }
    
    disconnectedCallback() {
		// unsubscribe from accountMapUpdate event
		unregisterAllListeners(this);
    }
    
    handleaccountMapUpdate(accs) {
        this.mapMarkers = accs.map(acc => {
            return {
                location : {
                    City : acc.BillingCity,
                    State : acc.BillingState,
                    Street : acc.BillingStreet,
                    PostalCode : acc.BillingPostalCode
                },
                title : acc.Name,
                icon : 'standard:account'
            };
        });
    }
}