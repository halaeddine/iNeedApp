import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-businessdetails',
  templateUrl: './businessdetails.page.html',
  styleUrls: ['./businessdetails.page.scss'],
})
export class BusinessdetailsPage implements OnInit {

 public _get:any;

  constructor(public navCtrl: NavController,private route: ActivatedRoute) { }

  ngOnInit() {

    this._get = this.route.snapshot.paramMap.get('id');

  }

}