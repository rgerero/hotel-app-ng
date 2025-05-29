import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup=new FormGroup({

  });

  constructor(
    private fb: FormBuilder, 
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    })

    let id=this.activatedRoute.snapshot.paramMap.get('id')
    console.log(id)    

    if(id){
      this.reservationService.getReservation(id).subscribe(rs=>{
        if(rs){
          console.log(rs);
          this.reservationForm.patchValue(rs);
        }
          
      })              
    }
  }


  onSubmit(){
    if(this.reservationForm.valid){
      let reservation: Reservation = this.reservationForm.value;
      let id=this.activatedRoute.snapshot.paramMap.get('id')
      
      if(id){
        this.reservationService.updateReservation(id,reservation).subscribe(() =>{
          console.log("Reservation updated successfully");
        });
      }
      else{
        this.reservationService.addReservation(reservation).subscribe(() => {
          console.log("Reservation added successfully");
        });
      }      
      this.router.navigate(['/list'])
    }
  }
}
