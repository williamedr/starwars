import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { SwapiProvider } from '../../providers/swapi/swapi';
import { UtilProvider } from '../../providers/util';
import { Vehicle } from '../../models/vehicle';

@Component({
    selector: 'page-vehicles',
    templateUrl: 'vehicles.html'
})
export class VehiclesPage {
    loading;
    metadata;
    vehicles: Vehicle[];

    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public util: UtilProvider,
        public swapi: SwapiProvider
    ) {
        this.initLoading();

        this.metadata = {
            count: 0,
            next: null,
            loading: false
        }

        this.vehicles = [];
        this.getVehicles();

        // this.vehicles = this.getData();      // Data offline
        // this.hideLoading();
    }

    private initLoading() {
        this.loading = this.util.getLoading(this.loadingCtrl);
        this.loading.present();
    }

    private hideLoading() {
        this.util.loadDismiss(this.loading);
    }

    private getVehicles() {
        this.swapi.getVehicles().then(
            data => {
                this.metadata.count = data['count'];
                this.metadata.next = data['next'];
                this.vehicles = this.vehicles.concat(data['data']);

                this.hideLoading();
            },
            error => {
                this.util.showAlertError(null, error.message);
                this.hideLoading();
            }
        );
    }

    loadMore(infiniteScroll) {
        if (this.metadata.loading) {
            return;
        }

        if (this.vehicles.length >= this.metadata.count) {
            infiniteScroll.enable(false);
            return;
        }

        this.metadata.loading = true;

        this.swapi.getUrl(this.metadata.next).subscribe(
            data => {
                this.metadata.next = data['next'];
                this.vehicles = this.vehicles.concat(data['results']);

                infiniteScroll.complete();
                this.metadata.loading = false;
            },
            error => {
                this.util.showAlertError(null, error.message);
            }
        );
    }


    private getData() {
        let arr = [
            {
                "name": "Sand Crawler",
                "model": "Digger Crawler",
                "manufacturer": "Corellia Mining Corporation",
                "cost_in_credits": "150000",
                "length": "36.8",
                "max_atmosphering_speed": "30",
                "crew": "46",
                "passengers": "30",
                "cargo_capacity": "50000",
                "consumables": "2 months",
                "vehicle_class": "wheeled",
                "pilots": [],
                "films": [
                    "https://swapi.co/api/films/5/",
                    "https://swapi.co/api/films/1/"
                ],
                "created": "2014-12-10T15:36:25.724000Z",
                "edited": "2014-12-22T18:21:15.523587Z",
                "url": "https://swapi.co/api/vehicles/4/"
            },
            {
                "name": "T-16 skyhopper",
                "model": "T-16 skyhopper",
                "manufacturer": "Incom Corporation",
                "cost_in_credits": "14500",
                "length": "10.4",
                "max_atmosphering_speed": "1200",
                "crew": "1",
                "passengers": "1",
                "cargo_capacity": "50",
                "consumables": "0",
                "vehicle_class": "repulsorcraft",
                "pilots": [],
                "films": [
                    "https://swapi.co/api/films/1/"
                ],
                "created": "2014-12-10T16:01:52.434000Z",
                "edited": "2014-12-22T18:21:15.552614Z",
                "url": "https://swapi.co/api/vehicles/6/"
            },
            {
                "name": "X-34 landspeeder",
                "model": "X-34 landspeeder",
                "manufacturer": "SoroSuub Corporation",
                "cost_in_credits": "10550",
                "length": "3.4",
                "max_atmosphering_speed": "250",
                "crew": "1",
                "passengers": "1",
                "cargo_capacity": "5",
                "consumables": "unknown",
                "vehicle_class": "repulsorcraft",
                "pilots": [],
                "films": [
                    "https://swapi.co/api/films/1/"
                ],
                "created": "2014-12-10T16:13:52.586000Z",
                "edited": "2014-12-22T18:21:15.583700Z",
                "url": "https://swapi.co/api/vehicles/7/"
            },
            {
                "name": "TIE/LN starfighter",
                "model": "Twin Ion Engine/Ln Starfighter",
                "manufacturer": "Sienar Fleet Systems",
                "cost_in_credits": "unknown",
                "length": "6.4",
                "max_atmosphering_speed": "1200",
                "crew": "1",
                "passengers": "0",
                "cargo_capacity": "65",
                "consumables": "2 days",
                "vehicle_class": "starfighter",
                "pilots": [],
                "films": [
                    "https://swapi.co/api/films/2/",
                    "https://swapi.co/api/films/3/",
                    "https://swapi.co/api/films/1/"
                ],
                "created": "2014-12-10T16:33:52.860000Z",
                "edited": "2014-12-22T18:21:15.606149Z",
                "url": "https://swapi.co/api/vehicles/8/"
            },
            {
                "name": "Snowspeeder",
                "model": "t-47 airspeeder",
                "manufacturer": "Incom corporation",
                "cost_in_credits": "unknown",
                "length": "4.5",
                "max_atmosphering_speed": "650",
                "crew": "2",
                "passengers": "0",
                "cargo_capacity": "10",
                "consumables": "none",
                "vehicle_class": "airspeeder",
                "pilots": [
                    "https://swapi.co/api/people/1/",
                    "https://swapi.co/api/people/18/"
                ],
                "films": [
                    "https://swapi.co/api/films/2/"
                ],
                "created": "2014-12-15T12:22:12Z",
                "edited": "2014-12-22T18:21:15.623033Z",
                "url": "https://swapi.co/api/vehicles/14/"
            },
            {
                "name": "TIE bomber",
                "model": "TIE/sa bomber",
                "manufacturer": "Sienar Fleet Systems",
                "cost_in_credits": "unknown",
                "length": "7.8",
                "max_atmosphering_speed": "850",
                "crew": "1",
                "passengers": "0",
                "cargo_capacity": "none",
                "consumables": "2 days",
                "vehicle_class": "space/planetary bomber",
                "pilots": [],
                "films": [
                    "https://swapi.co/api/films/2/",
                    "https://swapi.co/api/films/3/"
                ],
                "created": "2014-12-15T12:33:15.838000Z",
                "edited": "2014-12-22T18:21:15.667730Z",
                "url": "https://swapi.co/api/vehicles/16/"
            },
            {
                "name": "AT-AT",
                "model": "All Terrain Armored Transport",
                "manufacturer": "Kuat Drive Yards, Imperial Department of Military Research",
                "cost_in_credits": "unknown",
                "length": "20",
                "max_atmosphering_speed": "60",
                "crew": "5",
                "passengers": "40",
                "cargo_capacity": "1000",
                "consumables": "unknown",
                "vehicle_class": "assault walker",
                "pilots": [],
                "films": [
                    "https://swapi.co/api/films/2/",
                    "https://swapi.co/api/films/3/"
                ],
                "created": "2014-12-15T12:38:25.937000Z",
                "edited": "2014-12-22T18:21:15.714673Z",
                "url": "https://swapi.co/api/vehicles/18/"
            },
            {
                "name": "AT-ST",
                "model": "All Terrain Scout Transport",
                "manufacturer": "Kuat Drive Yards, Imperial Department of Military Research",
                "cost_in_credits": "unknown",
                "length": "2",
                "max_atmosphering_speed": "90",
                "crew": "2",
                "passengers": "0",
                "cargo_capacity": "200",
                "consumables": "none",
                "vehicle_class": "walker",
                "pilots": [
                    "https://swapi.co/api/people/13/"
                ],
                "films": [
                    "https://swapi.co/api/films/2/",
                    "https://swapi.co/api/films/3/"
                ],
                "created": "2014-12-15T12:46:42.384000Z",
                "edited": "2014-12-22T18:21:15.761584Z",
                "url": "https://swapi.co/api/vehicles/19/"
            },
            {
                "name": "Storm IV Twin-Pod cloud car",
                "model": "Storm IV Twin-Pod",
                "manufacturer": "Bespin Motors",
                "cost_in_credits": "75000",
                "length": "7",
                "max_atmosphering_speed": "1500",
                "crew": "2",
                "passengers": "0",
                "cargo_capacity": "10",
                "consumables": "1 day",
                "vehicle_class": "repulsorcraft",
                "pilots": [],
                "films": [
                    "https://swapi.co/api/films/2/"
                ],
                "created": "2014-12-15T12:58:50.530000Z",
                "edited": "2014-12-22T18:21:15.783232Z",
                "url": "https://swapi.co/api/vehicles/20/"
            },
            {
                "name": "Sail barge",
                "model": "Modified Luxury Sail Barge",
                "manufacturer": "Ubrikkian Industries Custom Vehicle Division",
                "cost_in_credits": "285000",
                "length": "30",
                "max_atmosphering_speed": "100",
                "crew": "26",
                "passengers": "500",
                "cargo_capacity": "2000000",
                "consumables": "Live food tanks",
                "vehicle_class": "sail barge",
                "pilots": [],
                "films": [
                    "https://swapi.co/api/films/3/"
                ],
                "created": "2014-12-18T10:44:14.217000Z",
                "edited": "2014-12-22T18:21:15.807906Z",
                "url": "https://swapi.co/api/vehicles/24/"
            }
        ];

        return arr.map(elem => new Vehicle(elem));
    }


}
