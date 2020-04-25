import { TestBed, ComponentFixture, async } from "@angular/core/testing"
import { SidebarComponent } from "./sidebar.component"
import { ProfileService } from "app/profile/profile.service";
import { WeatherService } from "app/weather/weather.service";
import { Http, ConnectionBackend, RequestOptions, BaseRequestOptions } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { City } from "app/profile/city";
import { Profile } from "app/profile/profile";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { WeatherItem } from "app/weather/item/weather-item";

describe('sidebarComponent', () => {
    const WEATHER_ITEMS: WeatherItem[] = [];
    const event = new MouseEvent('click');
    let component: SidebarComponent;
    let fixture: ComponentFixture<SidebarComponent>;
    let profileService: ProfileService;
    let weatherService: WeatherService;;
    let city: City[] = [
        {
            cityName: 'city',
            countryCode: 'CO'
        }
    ];
    let profile: Profile[] = [
        new Profile(
            'Default Profile',
            [
                {
                    cityName: 'New York',
                    countryCode: 'US'
                },
                {
                    cityName: 'London',
                    countryCode: 'GB'
                },
                {
                    cityName: 'Berlin',
                    countryCode: 'DE'
                }
            ]
        )
    ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SidebarComponent],
            providers: [
                {
                    provide: ProfileService,
                    useValue: { getProfiles: () => (profile), 
                        saveNewProfile: () => (city),
                        deleteProfile: () => (profile)
                        }
                }, 
                {
                    provide: WeatherService,
                    useValue: { getWeatherItems: () => ({cityName: 'New York', countryCode: 'US'}),
                    clearWeatherItems: () => (WEATHER_ITEMS),
                    searchWeatherInfo: () => (profile[0].cities[0].cityName),}
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
        fixture = TestBed.createComponent(SidebarComponent);
        component = fixture.componentInstance;
        profileService = TestBed.get(ProfileService);
        weatherService = TestBed.get(WeatherService);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch profile', () => {
        spyOn(profileService,'getProfiles'
        ).and.callThrough();
        component.ngOnInit();
        expect(profileService.getProfiles).toHaveBeenCalled();
        expect(component.profiles[0].cities[0].cityName).toBe('New York')
    });

    it('should save new profile', () => {
        spyOn(component, 'onSaveNewProfile');
        component.onSaveNewProfile();
        expect(component.onSaveNewProfile).toHaveBeenCalled();
    });

    it('should load profile', () => {
        spyOn(component, 'onLoadProfile');
        component.onLoadProfile(null);
        expect(component.onLoadProfile).toHaveBeenCalled();
    });

    it('should delete profile', () => {
        spyOn(profileService, 'deleteProfile').and.returnValue(profile);
        component.onDeleteProfile(event, profile[0]);
        expect(profileService.deleteProfile).toHaveBeenCalledWith(profile[0]);
    })
});