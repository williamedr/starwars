import { SwapiProvider } from './../../providers/swapi/swapi';
import { Component } from '@angular/core';
import { NavParams, NavController, LoadingController } from 'ionic-angular';
import { UtilProvider } from '../../providers/util';
import { People } from '../../models/people';

@Component({
  selector: 'page-actor-modal',
  templateUrl: 'actor-modal.html',
})
export class ActorModalPage {
  loading;
  actor: People;
  loaded: boolean;
  extra;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public util: UtilProvider,
    public navParams: NavParams,
    public swapi: SwapiProvider
  ) {
    this.initLoading();

    this.actor = navParams.get('item');
    this.extra = 'species';

    this.loaded = false;
    this.getExtraData();
  }

  private initLoading() {
    this.loading = this.util.getLoading(this.loadingCtrl);
    this.loading.present();
  }

  private hideLoading() {
    this.util.loadDismiss(this.loading);
  }

  private getExtraData() {
    let reqs = [];
    reqs.push(this.actor.homeworld);
    reqs = reqs.concat(this.actor.species);
    reqs = reqs.concat(this.actor.vehicles);
    reqs = reqs.concat(this.actor.starships);
    reqs = reqs.concat(this.actor.films);

    this.swapi.getBulkRequest(reqs).subscribe(
      res => {
        this.processActor(res);
        this.loaded = true;
        this.hideLoading();
      },
      error => {
        this.util.showAlertError(null, error.message);
        this.hideLoading();
      }
    );
  }


  private processActor(res: any) {
    let arr;

    this.actor.homeworld = res.shift();

    arr = [];
    for (let i = 0; i < this.actor.species.length; i++) {
      arr.push(res.shift());
    }
    this.actor.species = [];
    this.actor.species = this.actor.species.concat(arr);

    arr = [];
    for (let i = 0; i < this.actor.vehicles.length; i++) {
      arr.push(res.shift());
    }
    this.actor.vehicles = [];
    this.actor.vehicles = this.actor.vehicles.concat(arr);

    arr = [];
    for (let i = 0; i < this.actor.starships.length; i++) {
      arr.push(res.shift());
    }
    this.actor.starships = [];
    this.actor.starships = this.actor.starships.concat(arr);

    arr = [];
    for (let i = 0; i < this.actor.films.length; i++) {
      arr.push(res.shift());
    }
    this.actor.films = [];
    this.actor.films = this.actor.films.concat(arr);
  }

  close() {
    this.navCtrl.pop();
  }

}
