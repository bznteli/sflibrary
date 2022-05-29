import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

export default class lwcQuickAdd extends LightningElement {
    number1=0;
    number2=0;
    handleChange(event) {
        const field = event.target.name;
        const fieldValue = event.target.value;
        if (field === 'number1') {
            this.number1 = fieldValue;
        }
        else if (field === 'number2') {
            this.number2 = fieldValue;
        }
    }

    clickAdd() {
        try {
            var total = Number(this.number1) + Number(this.number2);
            console.log('total: ' + total);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'total: ' + total,
                    variant: 'success',
                }),
            );
        }
        catch (e) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: e.message,
                    variant: 'error',
                }),
            );

            console.log(e.message);
        }
    }

    
}