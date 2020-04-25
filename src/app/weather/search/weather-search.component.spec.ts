import { TestBed, ComponentFixture, async } from "@angular/core/testing"
import { WeatherService } from "app/weather/weather.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { WeatherItem } from "app/weather/item/weather-item";
import { WeatherSearchComponent } from "./weather-search.component";
import { Observable } from "rxjs";
import { HttpModule } from "@angular/http";
import { FormsModule, NgForm } from "@angular/forms";

describe('weatherSearchComponent', () => {
    const WEATHER_ITEMS: WeatherItem[] = [];
    let consoleLog = [];
    const mockLog = log => consoleLog.push(log);
    let component: WeatherSearchComponent;
    let fixture: ComponentFixture<WeatherSearchComponent>;
    let weatherService: WeatherService;
    let cityName: string = 'city';
    let cityDescription: string = 'weather';
    let cityTemperature: number = 14;
    const testForm = <NgForm>{
        value: {
            name: 'city'
        }
    }
    const newItem = new WeatherItem(cityName, cityDescription, cityTemperature, null);
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WeatherSearchComponent],
            imports:[HttpModule, FormsModule],
            providers: [
                {
                    provide: WeatherService,
                    useValue: { searchWeatherInfo: () => ( WEATHER_ITEMS ),
                        isExistWeatherItem: () => (true),
                        addWeatherItem: () => (newItem)
                }
                }],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        console.log = mockLog;
        fixture = TestBed.createComponent(WeatherSearchComponent);
        component = fixture.componentInstance;
        weatherService = TestBed.get(WeatherService);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch init data', () => {
        spyOn(weatherService, 'searchWeatherInfo').and.callThrough();;
        component.ngOnInit();
    })

    it('onSearchLocation(value:string) should return void', () => {
        component.onSearchLocation('New York');
        expect(consoleLog).toEqual(['New York']);
        expect(component.isSearching).toEqual(true);
    })

    it('onInit should define data', () => {
        component.ngOnInit();
        expect(component.data).toBeDefined()
    })

    it('onInit should throw error', () => {
        spyOn(weatherService, 'searchWeatherInfo').and.returnValue(Observable.throw({status: 404}));
    })

    it('onSubmit should work', () => {
        spyOn(component, 'onSubmit');
        component.onSubmit(null);
        expect(component.onSubmit).toHaveBeenCalled();
    });
});