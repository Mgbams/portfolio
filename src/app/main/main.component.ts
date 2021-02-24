import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NgwWowService} from 'ngx-wow';
import {  Contact } from './../models/contact.model';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
//import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2/dist/sweetalert2.js';
//import jsPDF from 'jspdf';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import {SendEmailService} from './../shared/send-email.service';

declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  contactForm: FormGroup;
  loading: boolean = false;
  buttonText: string = "Envoyer";

  // Pdf reference element
  @ViewChild('htmlData') htmlData: ElementRef;
  

   USERS = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "email": "sincere@april.biz",
      "phone": "1-770-736-8031 x56442"
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "email": "shanna@melissa.tv",
      "phone": "010-692-6593 x09125"
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "email": "nathan@yesenia.net",
      "phone": "1-463-123-4447",
    },
    {
      "id": 4,
      "name": "Patricia Lebsack",
      "email": "julianne@kory.org",
      "phone": "493-170-9623 x156"
    },
    {
      "id": 5,
      "name": "Chelsey Dietrich",
      "email": "lucio@annie.ca",
      "phone": "(254)954-1289"
    },
    {
      "id": 6,
      "name": "Mrs. Dennis",
      "email": "karley@jasper.info",
      "phone": "1-477-935-8478 x6430"
    }
  ];
 
  constructor(
    private wowService: NgwWowService, 
    private fb: FormBuilder, 
    //private _snackBar: MatSnackBar,
    private _sendEmailService: SendEmailService
    ) {}

  ngOnInit(): void {
    // Contact form Using FormBuilder approach
    this.createForm();     

    $(window).scroll(function () {
    if ($(document).scrollTop() > 50) {
      $(".nav").addClass("affix");
      } else {
        $(".nav").removeClass("affix");
      }
    });

    $(".navTrigger").click(function () {
      $(".navTrigger").toggleClass("active");
      $("#mainListDiv").toggleClass("show_list");
      $("#mainListDiv").fadeIn();
    });

    // Bounce logic added to navbar links
    $(function(){
      var str = '#len'; //increment by 1 up to 1-nelemnts
      $(document).ready(function(){
        let i : number;
        let stop: number;
        i = 1;
        stop = 4; //num elements
        setInterval(function(){
          if (i > stop){
            return;
          }
          $('#len'+(i++)).toggleClass('bounce');
        }, 500)
      });
    });
   
    /***Initialize wojs Animation as shown below ***/
    this.wowService.init();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  getErrorEmail() {
    return this.contactForm.get('email').hasError('required') ? 'Field is required' :
      this.contactForm.get('email').hasError('pattern') ? 'Not a valid emailaddress': ""
  }

  animateCard1() {
    const cards = $("#card1");
    const images = $(".card__img");
    const backgrounds = $(".card__bg");
    const range = 40;

    // const calcValue = (a, b) => (((a * 100) / b) * (range / 100) -(range / 2)).toFixed(1);
    const calcValue = (a: any, b: any) => (a/b*range-range/2).toFixed(1) // thanks @alice-mx

    let timeout: any;
    document.addEventListener('mousemove', ({x, y}) => {
      if (timeout) {
        window.cancelAnimationFrame(timeout);
      }
        
      timeout = window.requestAnimationFrame(() => {
        const yValue: any = calcValue(y, window.innerHeight);
        const xValue: any = calcValue(x, window.innerWidth);

        cards.csstransform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;

        [].forEach.call(images, (image: any) => {
          image.style.transform = `translateX(${-xValue}px) translateY(${yValue}px)`;
        });

        [].forEach.call(backgrounds, (background: any) => {
          background.style.backgroundPosition = `${xValue*.45}px ${-yValue*.45}px`;
        })
      })
    }, false);
  }

  // Close the side navigation on button click
  closeNav() {
    $(".navTrigger").toggleClass("active");
    $("#mainListDiv").toggleClass("show_list");
  }

  /* Handle form errors in Angular 11 */
  public errorHandling = (control: string, error: string) => { 
    return this.contactForm.controls[control].hasError(error);
  }

  // Form submission
  onSubmit() {
    if (this.contactForm.valid) {
     //this.openSnackBar("Message successfully sent!", "");
    //this.successNotification();
    this.sendEmail();


      /* Reset Form controls on submission */
      this.contactForm.reset();
      this.contactForm.controls['name'].setErrors(null);
      this.contactForm.controls['email'].setErrors(null);
      this.contactForm.controls['subject'].setErrors(null);
      this.contactForm.controls['message'].setErrors(null);
    }
  }

  // openSnackBar(message, action) {
  //   this._snackBar.open(message, action, {duration: 2000, panelClass: ['message-sent']});
  //   // Use this method when you don't have an action button but want code executed when snackbar dismisses
  // }

  //Sweet alert notification
  successNotification(name){
    Swal.fire(`Hi, ${name}`, 'Votre message a été envoyé avec succès!', 'success')
  }

  sendEmail() {
    this.loading = true;
    this.buttonText = "Envoyer .....";

    let userContact = {
      name: this.contactForm.get('name').value,
      email: this.contactForm.get('email').value,
      subject: this.contactForm.get('subject').value,
      message: this.contactForm.get('message').value
    }

    this._sendEmailService.sendEmail(userContact).subscribe(
      data => this.successNotification(userContact.name),
      (error) => {
        console.log(error);
        this.loading = false;
        this.buttonText = "Envoyer";
      },
      () => {
        this.loading = false;
        this.buttonText = "Envoyer";
      }
    )
  }

  
  public openPDF():void {
    let DATA = document.getElementById('htmlData');
      
    html2canvas(DATA).then(canvas => {
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', 'a4'); 
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        
        PDF.save('angular-demo.pdf');
    }); 
    
  }

}
