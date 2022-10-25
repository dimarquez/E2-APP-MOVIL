import { Component, OnInit } from '@angular/core';
import { Geoposition } from '@ionic-native/geolocation/ngx';

//Declaramos la variable de google, para que al instancia elementos de google, los entienda:
declare var google;

@Component({
  selector: 'app-geo',
  templateUrl: './geo.page.html',
  styleUrls: ['./geo.page.scss'],
})
export class GeoPage implements OnInit {

  //VARIABLES PARA EL MAPA:
  latitud: number;
  longitud: number;
  //VARIABLE MAP: variable a través de la cual se carga el mapa de google.
  map: any;
  marker: any;
  search: any;
  //NECESITAMOS 2 VARIABLES GLOBALES PARA CALCULAR Y MOSTRAR RUTA EN EL MAPA:
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  constructor() { }

  async ngOnInit() {
    await this.cargarMapa();
    this.autocompletado(this.map, this.marker);
  }

  //MÉTODOS PARA EL MAPA:
  async cargarMapa(){

    //obtengo latitud y longitud del navegador:
    var geolocation = await this.obtenerUbicacion();
    this.latitud = geolocation.coords.latitude;
    this.longitud = geolocation.coords.longitude;

    //mapa: toma el elemento div llamado map desde el HTML:
    const mapa: HTMLElement = document.getElementById('map');

    this.map = new google.maps.Map(mapa, {
      center: {
        lat: this.latitud,
        lng: this.longitud
      },
      zoom: 18
    });
    this.directionsRenderer.setMap(this.map);
    const indicacionesHTML: HTMLElement = document.getElementById('indicaciones');
    this.directionsRenderer.setPanel(indicacionesHTML);

    this.marker = new google.maps.Marker({
      position: {lat: this.latitud, lng: this.longitud},
      map: this.map,
      title: 'Ubicacion inicial'
    });

  }

  //mi ubicacion actual: SE CREA UN MÉTODO TIPO PROMESA OBTENER LA UBICACIÓN INICIAL O ACTUAL:
  obtenerUbicacion(): Promise<any>{
    return new Promise(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );
  }

  autocompletado(mapaLocal, marcadorLocal){
    var autocomplete: HTMLElement = document.getElementById('autocomplete');
    const search = new google.maps.places.Autocomplete(autocomplete);
    search.bindTo('bounds', this.map);
    this.search = search;

    search.addListener('place_changed', function(){
      var place = search.getPlace().geometry.location;
      mapaLocal.setCenter(place);
      mapaLocal.setZoom(15);

      marcadorLocal.setPosition(place);
      marcadorLocal.setMap(mapaLocal);

    });
  }

  //método que nos muestre la ruta más optima entre 2 ubicaciones:
  calcularRuta(){
    var place = this.search.getPlace().geometry.location;
    
    var request = {
      origin: { lat: -33.60962668977899, lng: -70.5750965398923},
      destination: place,
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(request, (resultado, status) => {
      this.directionsRenderer.setDirections(resultado);
    });

    this.marker.setPosition(null);

  }
  
}
