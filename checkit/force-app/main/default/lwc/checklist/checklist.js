import { LightningElement, api, wire } from 'lwc';
import getChecklistItems from '@salesforce/apex/ChecklistController.getChecklistItems';

export default class Checklist extends LightningElement {
    @api recordId;
    //wires
    @wire(getChecklistItems) checklistItems;

    options = [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
    ];
  
    // Select option1 by default
    value = ['Yes'];
  
    handleChange(event) {
          const changeValue = event.detail.value;
          alert(changeValue);
    }

    handleToggleSection(event) {

    }

    handleEditClick(event) {

    }

    handleSaveClick(event) {

    }
}