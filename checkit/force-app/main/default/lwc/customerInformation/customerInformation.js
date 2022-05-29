import { LightningElement, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import getLead from '@salesforce/apex/LeadController.getLead';
import updateLead from '@salesforce/apex/LeadController.updateLead';
import getSurveyCount from '@salesforce/apex/LeadController.getSurveyCount';

export default class CustomerInformation extends NavigationMixin(LightningElement) {
    combobox1Value = '';
    checkbox1Value = '';
    radiogroup1Value = '';
    clickButtonLabel = '';
    currentPageReference = null;
    urlStateParameters = null;
    firstName = '';
    lastName = '';
    patientSurveyComplete;
    patientSurveyRecord = {
        Lead__c : "",
        Preferred_Contact_Method__c : ""
    }
    

    /* Params from Url */
    referenceId = null;

    @wire(getSurveyCount, { leadId: '$referenceId'})
    getSurveyCount({error, data})
    {
        console.log('isSurveyComplete:');
        console.log(data);
        if (data) {
            this.patientSurveyComplete = data;

            if (this.patientSurveyComplete > 0) {
                this[NavigationMixin.Navigate]({
                    type: 'comm__namedPage',
                    attributes: {
                        name: 'surveycompleted__c',
                    },
                    state: {
                        referenceId : this.referenceId
                    }
                });
            }
        }
        else if (error) {
            console.log(error);
        }
    }


    @wire(getLead, { leadId: '$referenceId'})
    getLead({error, data})
    {
        if (data) {
            this.leadInformation = data;
            this.firstName = data.FirstName;
            this.lastName = data.LastName;
            console.log('wiredLead:');
            console.log(data);
        }
        else if (error) {
            console.log(error);
        }
    }

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
       if (currentPageReference) {
          this.urlStateParameters = currentPageReference.state;
          this.setParametersBasedOnUrl();
       }
    }
 
    setParametersBasedOnUrl() {
       this.referenceId = this.urlStateParameters.referenceId || null;
       console.log('referenceId: ' + this.referenceId);
       if (!this.referenceId) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Error',
            },
            state: {
                //referenceId : this.referenceId
            }
        });
       }
    }

    get combobox1Options() {
        return [
            { label: 'Email', value: 'Email' },
            { label: 'Phone', value: 'Phone' }
        ];
    }

    handleCombobox1Change(event) {
        this.combobox1Value = event.detail.value;
        console.log('value: ' + this.combobox1Value);
    }

    get checkbox1Options() {
        return [
            { label: 'Email', value: 'Email' },
            { label: 'Phone', value: 'Phone' }
        ];
    }

    handleCheckbox1Change(event) {
        this.checkbox1Value = event.detail.value;
    }

    get radiogroup1Options() {
        return [
            { label: 'Email', value: 'Email' },
            { label: 'Phone', value: 'Phone' },
        ];
    }

    handleRadiogroup1Change(event) {
        this.radiogroup1Value = event.detail.value;
    }

    handleCancelClick(event) {
        this.clickButtonLabel = event.target.label;
    }

    async handleSaveClick(event) {
        try {
            console.log('handleSaveClick');
            
            //await(updateLead({leadId : this.referenceId, survey : event.detail.value}));
            this.patientSurveyRecord.Lead__c = this.referenceId;
            this.patientSurveyRecord.Preferred_Contact_Method__c = this.combobox1Value;
            await(updateLead({patientSurvey : this.patientSurveyRecord}));
            
            this.clickButtonLabel = event.target.label;
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    name: 'thankyou__c',
                },
                state: {
                    referenceId : this.referenceId
                }
            });
        }
        catch(error) {
            console.log('error: ', error);
        }
    }

    connectedCallback() {
        console.log('connectedCallback: ' + this.referenceId + ' firstName: ' + this.firstName);
    }

    renderedCallback() {
        console.log('renderedCallback: ' + this.referenceId + ' firstName: ' + this.firstName);
    }
}