import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import BASE_URL from '../../auth/services/helper';

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public additem(data: any): Observable<any> {
    return this.http.post(BASE_URL + '/item/add-item', data);
  }

  public getitems(): Observable<any> {
    return this.http.get(BASE_URL + '/item/get-items');
  }

  public getitem(data: any): Observable<any> {
    return this.http.post(BASE_URL + '/item/get-item', data);
  }

  public deleteitem(itemId: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/item/delete-item/${itemId}`);
  }

  public updateitem(data: FormData): Observable<any> {
    return this.http.patch(BASE_URL + '/item/update-item', data);
  }

  public addtopping(data: any): Observable<any> {
    return this.http.post(BASE_URL + '/topping/add-topping', data);
  }

  public gettoppings(): Observable<any> {
    return this.http.get(BASE_URL + '/topping/get-toppings');
  }

  public gettopping(data: any): Observable<any> {
    return this.http.post(BASE_URL + '/topping/get-topping', data);
  }

  public deletetopping(toppingId: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/topping/delete-topping/${toppingId}`);
  }

  public updatetopping(
    editingToppingId: number,
    data: FormData
  ): Observable<any> {
    return this.http.put(BASE_URL + '/topping/update-topping', data);
  }

  public addsales(data: any): Observable<any> {
    return this.http.post(BASE_URL + '/sale/add-sale', data);
  }
  

  public saleupidatereports(data: any): Observable<any> {
    return this.http.post(BASE_URL + '/report/sale-upi-date-reports', data);
  }

  public salecashdatereports(data: any): Observable<any> {
    return this.http.post(BASE_URL + '/report/sale-cash-date-reports', data);
  }

  public totalCashOrders(): Observable<number> {
    return this.http.get<number>(`${BASE_URL}/sale/total-cash-orders`);
  }

  public totalUpiOrders(): Observable<number> {
    return this.http.get<number>(`${BASE_URL}/sale/total-upi-orders`);
  }

  public upiPayment(): Observable<number> {
    return this.http.get<number>(`${BASE_URL}/sale/grand-total-upi-orders`);
  }

  public cashTotal(): Observable<number> {
    return this.http.get<number>(`${BASE_URL}/sale/grand-total-cash-orders`);
  }

  public getPendingOrdersKitchen(): Observable<any> {
    return this.http.get(BASE_URL + "/sale/get-pending-orders-kitchen");
  }

  public getCompletedOrders(): Observable<any> {
    return this.http.get(`${BASE_URL}/sale/get-completed-orders-counter`);
  }

  public updateOrderStatus(data: any): Observable<any> {
    return this.http.patch(`${BASE_URL}/itemOrder/update-order-status`, data);
  }

  public removeOrder(data: any): Observable<any> {
    return this.http.post(`${BASE_URL}/itemOrder/remove-order`, data);
  }

  public getCustomerCompletedOrders():Observable<any>{
    return this.http.get(`${BASE_URL}/tempSale/get-customer-completedOrders`)
  }

  public deleteTempSaleData(data:any):Observable<any>{
    return this.http.post(BASE_URL + "/tempSale/delete-tempSale", data)
  }
}
