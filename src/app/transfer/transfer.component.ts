import { TransactionsService } from './../services/transactions.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent {

  currentStep = 'form';
  formDataValues = null;
  accountAmount = 5000;
  isAmounToLow = false;
  isSubmitClicked = false;

  constructor(
    private transactionsService : TransactionsService
  ) { }

  ngOnInit() {
    this.formDataValues = {
      "amount": null,
      "merchantName": "",
      "toAccount": ""
    }
  }

  onSubmit(formData) {
    this.isSubmitClicked = true;
    console.log(formData.value);
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
    this.resetForm();
    this.currentStep = 'form'
  }

}

