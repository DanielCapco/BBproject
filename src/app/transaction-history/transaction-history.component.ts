import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionsService } from './../services/transactions.service';


@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {

  searchText = '';
  transactions = [];
  sortAscending = false;
  sortBy = 'date';

  constructor(
    private transactionsService : TransactionsService 
  ) { }

  ngOnInit(){
    this.transactionsService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
      this.sortTransactions();
    });
  }

  sortTransactions():void {
    this.transactions.sort((transactionA, transactionB) => {
      let valueA;
      let valueB;
      if(this.sortBy === 'amount') {
        valueA = transactionA.transaction.amountCurrency.amount;
        valueB = transactionB.transaction.amountCurrency.amount;
      } else if (this.sortBy === 'beneficiary') {
        valueA = transactionA.merchant.name;
        valueB = transactionB.merchant.name;
        if(this.sortAscending){
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      } else if (this.sortBy === 'date') {
        valueA = (new Date(transactionA.dates.valueDate)).getTime();
        valueB = (new Date(transactionB.dates.valueDate)).getTime();
      }
      if(this.sortAscending){
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    });
  }
  
  sortByParam(param){
    if(this.sortBy === param){
      this.sortAscending = !this.sortAscending;
    }
    this.sortBy = param;
    this.sortTransactions();
  }


}
