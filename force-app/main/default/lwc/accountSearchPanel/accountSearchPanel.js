import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
import { LightningElement, wire } from 'lwc';
import searchAccount from '@salesforce/apex/AccountController.searchAccount';

export default class AccountSearchPanel extends LightningElement {
    searchTerm = '';
    accounts;
    @wire(CurrentPageReference) pageRef;
    @wire(searchAccount, {searchTerm: '$searchTerm'})
    loadAccounts(result) {
        this.accounts = result;
        if (result.data) {
            fireEvent(this.pageRef, 'accountListUpdate', result.data);
            fireEvent(this.pageRef, 'accountMapUpdate', result.data);
        }
    }

    handleSearchTermChange(event) {
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
	}
}