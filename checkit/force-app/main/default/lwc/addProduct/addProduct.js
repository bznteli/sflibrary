import { LightningElement } from 'lwc';
import fetchDataHelper from './fetchDataHelper';

const columns = [
    { label: 'Label', fieldName: 'name' },
    { label: 'Website', fieldName: 'website', type: 'url' },
    { label: 'Phone', fieldName: 'phone', type: 'phone' },
    { label: 'Balance', fieldName: 'amount', type: 'currency' },
    { label: 'CloseAt', fieldName: 'closeAt', type: 'date' },
];

export default class addProduct extends LightningElement {
    productName = '';
    data = [];
    columns = columns;
    
    handleChange(event) {
        var fieldName = event.target.name;
        var fieldValue = event.target.value;

        if (fieldName === "productName")
            this.productName = fieldValue;
    }

    // eslint-disable-next-line @lwc/lwc/no-async-await
    /*async connectedCallback() {
        const data = await fetchDataHelper({ amountOfRecords: 100 });
        this.data = data;
    }*/

    async handleClick() {
        const data = await fetchDataHelper({ amountOfRecords: 100 });
        this.data = data;
    }
}