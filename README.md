# <img width="300px" src="https://images.pexels.com/photos/1446076/pexels-photo-1446076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"> <br> Weather app 

## Table of contents
* [General info](#general-info)
* [Demo](#demo)
* [Used services](#used-services)

## General info 
This project is a web application for searching current weather information for given cities.

## Demo 
At the initial startup, you can choose weather api data source: 
<br>
<img src="https://i.imgur.com/OeynjaY.png">

Adding a city:
<br>
<img src="https://i.imgur.com/94BsCIB.png">
<br>
<img src="https://i.imgur.com/GeXFrna.png">

Optionally choosing city on a map: 
<br>
<img src="https://i.imgur.com/RDOCzva.png">

City info view: 
<br>
<img src="https://i.imgur.com/3ypzrsF.png">

All selected cities view: 
<br>
<img src="https://i.imgur.com/a1JziV8.png">

Edit app settings: 
<br>
<img src="https://i.imgur.com/4blZqhb.png">

## Used services 
### LsService 
Service for managing localstorage.
Init the service:
``` 
const lsService = new LsService();
```
Run init() method for setting localstorage item for your app (store argument's value somewhere else for later use):
``` 
lsService.init("my-app-ls-key");
```
Example: get data (static method):
``` 
LsService.get("my-app-ls-key");
```
<hr>

### ModalService
Service for managing modals (adding city, city list, settings, etc)
Init the service: 
``` 
const modalService = new ModalService();
```
Create a modal (this method returns an actual DOM element)
``` 
const myModal = modalService.createModal(
  "modal-type", // found in app/js/constants | modalTypes
  () => [
    document.createElement("div"),
    document.createElement("h1")
  ],
  ["class1", "class2"], // optional
  "modal-id" // optional
);
```
Mount the modal wherever you need it: 
``` 
document.querySelector("body").appendChild(myModal);
```
<hr>

### WeatherAPIService
Service for managing calling different APIs for getting weather data
Init the service: 
``` 
const weatherAPIService = new WeatherAPIService();
```
Get available API types: 
``` 
const weatherAPITypes = weatherAPIService.getApiTypes();
```
Select which one to use: 
``` 
weatherAPIService.setApiType(weatherAPITypes["api-type"]); // found in app/js/constants | apiTypes
```
Make a call: 
``` 
weatherAPIService.getForecast("Moscow", [54.913681, 37.416601]) // second argument is coordinates, btw
  .then((res) => res.json())
  .then((cityData) => console.log(cityData)); 
```
<hr>

### MapService
Service for creating and managing different maps 
Init the service: 
``` 
const mapService = new MapService();
```
Get available map types: 
``` 
const mapTypes = mapService.getMapTypes();
```
Select which one to use: 
``` 
mapService.setMapType(mapTypes["map-type"]); // found in app/js/constants | mapTypes
```
Create a map: 
``` 
mapService.createMap(
  "map-container", // id of existing DOM element
  "Moscow" // optional name of a city (in case you want to put this value into map's search right away)
);
```
