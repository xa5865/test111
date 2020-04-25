import { TestBed, ComponentFixture, async } from "@angular/core/testing"
import { WeatherService } from "app/weather/weather.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { WeatherItem } from "app/weather/item/weather-item";
import { WeatherListComponent } from "./weather-list.component";

describe('weatherListComponent', () => {
    const WEATHER_ITEMS: WeatherItem[] = [];
    let component: WeatherListComponent;
    let fixture: ComponentFixture<WeatherListComponent>;
    let weatherService: WeatherService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WeatherListComponent],
            providers: [
                {
                    provide: WeatherService,
                    useValue: { getWeatherItems: () => ( WEATHER_ITEMS )
                }
                }],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WeatherListComponent);
        component = fixture.componentInstance;
        weatherService = TestBed.get(WeatherService);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch weather items', () => {
        spyOn(weatherService,'getWeatherItems').and.callThrough();
        component.ngOnInit();
        expect(weatherService.getWeatherItems).toHaveBeenCalled();
    });
});