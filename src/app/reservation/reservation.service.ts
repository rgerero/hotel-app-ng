import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];

  constructor() {
    // Load reservations from localStorage if available
    //const storedReservations = localStorage.getItem("reservations");
    let storedReservations = localStorage.getItem("reservations");
    if (storedReservations) {
      this.reservations = JSON.parse(storedReservations);
    }
  }

  //CRUD
  getReservations(): Reservation[]{
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined{
    return this.reservations.find(res=> res.id === id);
  }

  addReservation(reservation: Reservation): void{
    reservation.id=Date.now().toString()
    this.reservations.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  deleteReservation(id: string): void{
    let index=this.reservations.findIndex(res=> res.id === id);
    this.reservations.splice(index,1);
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  updateReservation(id: string,updatedReservation: Reservation): void{
    let index=this.reservations.findIndex(res=> res.id === id);
    updatedReservation.id=id
    // console.log('update:' + updatedReservation.id);
    this.reservations[index] = updatedReservation;
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }
}
