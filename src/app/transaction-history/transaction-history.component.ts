import { Component, OnInit } from '@angular/core';
import { TransactionsService } from './../services/transactions.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {

  transactions = {};

  constructor(
    private transactionsService : TransactionsService 
  ) { }

  ngOnInit(){
    this.transactionsService.getJSON().subscribe(data => {
          this.transactions = data.data;
          console.log('trans', this.transactions);
      });
  }

}
