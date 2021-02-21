import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  
  constructor() {}

  ngOnInit(): void {
    $(window).scroll(function () {
    if ($(document).scrollTop() > 50) {
      $(".nav").addClass("affix");
      console.log("OK");
      } else {
        $(".nav").removeClass("affix");
      }
    });

    $(".navTrigger").click(function () {
      console.log("hello");
      $(".navTrigger").toggleClass("active");
      console.log("Clicked menu");
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
   
  }

  animateCard1() {
    console.log("card animation");

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

}

