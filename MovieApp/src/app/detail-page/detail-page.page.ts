import { Movie } from './../models/movie';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.page.html',
  styleUrls: ['./detail-page.page.scss'],
})
export class DetailPagePage implements OnInit {

  public data:any;
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params=>{ //burda abone olduk gelen routa params ile gelen cevapı tutuyoruz

       //
      this.data=JSON.parse(params.movie) //jsonu parse ettik artık datayla işimiz
      console.log(this.data)
      
    })
  }

  ngOnInit() {
  }

}
