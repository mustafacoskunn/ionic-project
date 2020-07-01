import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  number1:number;
  number2:number;
  result:number;
  constructor() {
   
  }

  
  topla(){
    this.result=Number(this.number1)+Number(this.number2) 
  }
  cikar(){
    this.result=this.number1-this.number2

  }
  carp(){
    this.result=this.number1*this.number2

  }
  bol(){
    this.result=this.number1/this.number2

  }

}
