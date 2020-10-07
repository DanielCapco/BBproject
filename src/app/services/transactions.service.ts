import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TransactionsService {

	transactions$ = new BehaviorSubject<Array<any>>([]);

	constructor(private http: HttpClient) {
		this.getJSON().subscribe(result => {
			this.transactions$.next(result.data);
		});
	}

	private getJSON(): Observable<any> {
		return this.http.get("./assets/transactions.json");
	}

	getTransactions() {
		return this.transactions$.asObservable();
	}

	addTransaction(transaction: any) {
		const transactions = this.transactions$.getValue();
		this.transactions$.next([transaction, ...transactions]);
	}
}