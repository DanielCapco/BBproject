import { TransactionsService } from './../services/transactions.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent {

  currentStep = 'form';
  formDataValues = null;
  accountAmount = 5000;
  isSubmitClicked = false;

  constructor(
    private transactionsService : TransactionsService
  ) { }

  ngOnInit() {
    this.resetForm();
  }

  onSubmit(formData) {
    this.isSubmitClicked = true;
    this.formDataValues = formData.value;
    if(!formData.valid) {
      return;
    }
    this.currentStep = 'preview';  
  }
  
  resetForm() {
    this.formDataValues = {
      "amount": null,
      "merchantName": "",
      "toAccount": ""
    }
    this.isSubmitClicked = false;
  }

  format(amt){
    if(amt !== null && amt % 1 === 0){
      amt = amt + '.00';
      this.formDataValues.amount = amt;
    }
  }

  remove(amt){
    if(amt !== null && amt % 1 === 0){
      console.log('remove', amt)

      this.formDataValues.amount = amt * 1;
    }
  }
  onTransfer() {
    const transaction = {
      "categoryCode": "#cccccc",
      "dates": {
        "valueDate": (new Date()).getTime()
      },
      "transaction": {
        "amountCurrency": {
          "amount": this.formDataValues.amount,
          "currencyCode": "EUR"
        },
        "type": "",
        "creditDebitIndicator": "DBIT"
      },
      "merchant": {
        "name": this.formDataValues.merchantName,
        "accountNumber": this.formDataValues.toAccount
      }
    };
    this.transactionsService.addTransaction(transaction)
    this.accountAmount -= this.formDataValues.amount;
    this.resetForm();
    this.currentStep = 'form'
  }

}

