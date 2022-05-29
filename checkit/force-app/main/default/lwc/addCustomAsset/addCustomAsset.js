import { api, LightningElement, wire } from 'lwc';
import getCustomAssetList from '@salesforce/apex/CustomAssetController.getCustomAssetList';
import addCustomAssetToQuote from '@salesforce/apex/CustomAssetController.addCustomAssetToQuote';
import { refreshApex } from '@salesforce/apex';
import { getRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Asset Tag', fieldName: 'Asset_Tag__c' },
    { label: 'Status', fieldName: 'Status__c' },
    { label: 'VIN', fieldName: 'Vehicle_Identification_Number__c'},
];

export default class addCustomAsset extends LightningElement {
    @api recordId;
    productName = '';
    data = [];
    columns = columns;
    @wire(getCustomAssetList, { productName: '$productName'}) customAssets;
    
    handleChange(event) {
        var fieldName = event.target.name;
        var fieldValue = event.target.value;

        if (fieldName === "productName") {
            this.productName = fieldValue;
            refreshApex(this.customAssets);
        }
    }
    
    handleSearchClick(event) {
        refreshApex(this.customAssets);
    }

    async handleAddClick(event) {
        try {
            //iterate over selected datatable items and add them to the quote
            console.log("getSelectedRows: " + this.template.querySelector('lightning-datatable').getSelectedRows());
            console.log("recordId: ", this.recordId);
            var selectedRows = this.template.querySelector('lightning-datatable').getSelectedRows();
            var selectedAssets = [];
            for (var selectedRow of selectedRows) {
                selectedAssets.push(selectedRow.Id);
            }

            await(addCustomAssetToQuote({quoteRecordId : this.recordId, customAssetIds : selectedAssets}));
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Record Added successfully.',
                    variant: 'success',
                }),
            );

            this.closeQuickAction();
            this.refresh();
        }
        catch (error) {
            console.log('error: ', error);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error.message,
                    variant: 'error',
                }),
            );
        }
    }

    closeQuickAction() {
        const closeQA = new CustomEvent('close');
        this.dispatchEvent(closeQA);
    }

    refresh() {
        const refreshEvent = new CustomEvent('refresh');
        this.dispatchEvent(refreshEvent);
    }
}