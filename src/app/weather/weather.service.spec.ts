import { TestBed, getTestBed, tick, fakeAsync, async, inject } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { ReflectiveInjector } from '@angular/core';
import { ConnectionBackend, Http, BaseRequestOptions, RequestOptions, HttpModule } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { WeatherItem } from './item/weather-item';
import { Response, ResponseOptions} from '@angular/http';
import { WEATHER_ITEMS } from './mock-weather';

const WEATHER1 = 'weatherOne';
var weatherItem: WeatherItem = { city: 'city', description: 'description', temperature: 12, countryCode: 'AB'}
var weatherItem2: WeatherItem = { city: 'city2', description: 'description2', temperature: 23, countryCode: 'CD'}
var isExist: boolean;

describe('WeatherService', () => {
    let service: WeatherService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                WeatherService,
                {
                    provide: Http,
                    deps:[MockBackend, BaseRequestOptions]
                },
            ],
            imports: [
                HttpClientTestingModule
            ]
        });
        service = TestBed.get(WeatherService);
        httpMock = TestBed.get(HttpTestingController);
    });
    
    afterEach(() => {
        httpMock.verify();
    });

    it ('should create', () => {
         expect(service).toBeTruthy();
    });

    it('getWeatherItems() should be defined', () => {
        expect(service.getWeatherItems()).toBeDefined();
    });

    it('addWeatherItem(item: WeatherItem) should add', () => {
        service.addWeatherItem(weatherItem);
        expect(WEATHER_ITEMS.length).toBe(1);
    });

    it('clearWeatherItems() should clear', () => {
        service.addWeatherItem(weatherItem);
        service.clearWeatherItems();
        expect(WEATHER_ITEMS.length).toBe(0);
    });

    it('deleteWeatherItem(item: WeatherItem) should delete', () => {
        service.addWeatherItem(weatherItem);
        service.addWeatherItem(weatherItem2);
        service.deleteWeatherItem(weatherItem);
        expect(WEATHER_ITEMS.length).toBe(1);
        expect(WEATHER_ITEMS[0].temperature).toBe(23);
    });

    it('isExistWeatherItem(item: WeatherItem) should return true', () => {
        service.addWeatherItem(weatherItem);
        isExist = service.isExistWeatherItem(weatherItem);
        expect(isExist).toBe(true);
    });
});