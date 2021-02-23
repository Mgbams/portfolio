import { Component, OnInit } from '@angular/core';
import {NgwWowService} from 'ngx-wow';
import {  Contact } from './../models/contact.model';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  contactForm: FormGroup;
 
  constructor(private wowService: NgwWowService, private fb: FormBuilder, private _snackBar: MatSnackBar) {}

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
  //console.log(this.contactForm.controls[control].hasError(error));
  
    return this.contactForm.controls[control].hasError(error);
  }
  // Form submission
  onSubmit() {
    console.log(this.contactForm.value);
    console.log("form  NOT submitted");
    if (this.contactForm.valid) {
     this.openSnackBar("Message successfully sent!", "");
    }
  }

  openSnackBar(message, action) {
    this._snackBar.open(message, action, {duration: 2000, panelClass: ['message-sent']});
    // Use this method when you don't have an action button but want code executed when snackbar dismisses
  }

}