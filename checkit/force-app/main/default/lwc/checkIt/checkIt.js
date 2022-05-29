import { wire, api, LightningElement } from 'lwc';
import getChecklistItems from '@salesforce/apex/ChecklistController.getChecklistItems';
import getChecklistResponses from '@salesforce/apex/ChecklistController.getChecklistResponses';
import createChecklistItemsFor from '@salesforce/apex/ChecklistController.createChecklistItemsFor';


export default class CheckIt extends LightningElement {
    @api recordId;
    checklistResponses;
    checklistItems;
    //value = ["a0Y4x000000qUhOEAU"];

    @wire(getChecklistItems)
    wiredChecklistItems({error, data}) {
        if (data) {
            this.checklistItems = data;
            console.log('wiredChecklistItems:');
            console.log(data);

        }
        else if (error) {
            console.log(error);
        }
    }

    @wire(getChecklistResponses, { parentRecordId: '$recordId'})
    wiredChecklistResponses({error, data})
    {
        if (data) {
            this.checklistResponses = data;
            console.log('wiredChecklistResponses:');
            console.log(data);
        }
        else if (error) {
            console.log(error);
        }
    }

    constructor() {
        super();
        console.log('constructor');
    }

    connectedCallback() {
        //Called when the element is inserted into a document. 
        //This hook flows from parent to child. You can’t access child elements because they don’t exist yet.

        console.log('connectedCallback');
    }

    renderedCallback() {
        
        console.log('renderedCallback');

        if (this.recordId) {
            console.log(this.recordId);
        }
    }

    get options() {
        let checklistCollection = [];
        if (this.checklistItems) {
            this.checklistItems.forEach(
                element => 
                    checklistCollection.push({label: element.Checklist_Item_Text__c, value: element.Id})
            );
            
        }
        console.log('options');
        console.log(checklistCollection);
        return checklistCollection;
    }

    get value() {
        let selectedCollection = [];
        for (var key in this.checklistResponses) {
            selectedCollection.push(this.checklistResponses[key].Checklist_Item__c);
        }

        return selectedCollection;
    }

    get selectedValues() {

    }

    handleSaveClick(event) {

    }

    async handleChange(event) {
        try {
            console.log('handleChange');
            console.log(event.detail.value);
            await(createChecklistItemsFor({parentRecordId : this.recordId, checklistItemIds : event.detail.value}));
        }
        catch(error) {
            console.log('error: ', error);
        }
    }
}