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
  // isOverdraftBeyonded = false;
  isAmounToLow = false;
  isSubmitClicked = false;

  constructor(
    private transactionsService : TransactionsService
  ) { }

  onSubmit(formData) {
    this.isSubmitClicked = true;
    this.formDataValues = formData.value;
    // console.log(formData);
    
    // if(formData.amount <= 0) {
    //   this.isAmounToLow = true;
    //   return;
    // } 
    // if(this.accountAmount - formData.amount < -500) {
    //   this.isOverdraftBeyonded = true;
    //   return;
    // }
    if(!formData.valid) {
      return;
    }
    this.currentStep = 'preview';  
  }
  onTransfer() {
    const transaction = {
      "categoryCode": "",
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
    this.currentStep = 'form'
  }

}

