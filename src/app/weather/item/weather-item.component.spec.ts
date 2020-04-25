import { TestBed, ComponentFixture, async } from "@angular/core/testing"
import { WeatherService } from "app/weather/weather.service";
import { Http, BaseRequestOptions } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { WeatherItem } from "app/weather/item/weather-item";
import { WeatherItemComponent } from "./weather-item.component";
import { Component } from '@angular/core';

describe('weatherItemComponent', () => {
    const WEATHER_ITEMS: WeatherItem[] = [];
    let weatherItem: WeatherItem = { city: 'city', description: 'description', temperature: 12, countryCode: 'AB'}
    WEATHER_ITEMS[0] = weatherItem;
    let component: WeatherItemComponent;
    let fixture: ComponentFixture<TestComponentWrapper>;
    let weatherService: WeatherService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponentWrapper, WeatherItemComponent],
            providers: [
                {
                    provide: WeatherService,
                    useValue: {deleteWeatherItem: () => (WEATHER_ITEMS)}
                },
                {
                    provide: Http,
                    deps:[MockBackend, BaseRequestOptions]
                },
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponentWrapper);
        component = fixture.debugElement.children[0].componentInstance;
        weatherService = TestBed.get(WeatherService);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should delete', () => {
        var event = {
            type: 'click',
            stopPropagation: function(){}
        }
        spyOn(weatherService, 'deleteWeatherItem'
        ).and.returnValue(WEATHER_ITEMS);
        var eventSpy = spyOn(event, 'stopPropagation');

        component.onDeleteItem(event, weatherItem);
        expect(eventSpy).toHaveBeenCalledWith();
        expect(weatherService.deleteWeatherItem).toHaveBeenCalledWith(weatherItem);
    })
});

@Component({
    selector:'test-component-wrapper',
    template: '<weather-item [weatherItem]="weatherItem"></weather-item>'
})
class TestComponentWrapper {
    weatherItem = new WeatherItem('city','description',12,'AB');
}