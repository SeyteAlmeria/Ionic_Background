import { Component } from '@angular/core'
import { BackgroundMode } from '@ionic-native/background-mode/ngx'
import { Plugins } from '@capacitor/core'
import { Platform } from '@ionic/angular'
import { HttpClient } from '@angular/common/http'

const { Haptics, Geolocation } = Plugins

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    constructor(public backgroundMode: BackgroundMode, private platform: Platform, private http: HttpClient) {
        this.platform.ready().then(() => {
            this.backgroundMode.enable();

            this.backgroundMode.on('activate').subscribe(() => {
                console.log('background mode activated event');
                this.backgroundMode.disableWebViewOptimizations();
            });

            console.log('background mode enabled?', this.backgroundMode.isEnabled())
            console.log('background mode active?', this.backgroundMode.isActive())
            setInterval(() => {
                console.log('background mode enabled?', this.backgroundMode.isEnabled())
                console.log('background mode active?', this.backgroundMode.isActive())
                Haptics.vibrate()
                Geolocation.getCurrentPosition({
                    enableHighAccuracy: false,
                    timeout: 1000,
                }).then(coordinates => {
                    const p = {
                        latitude: coordinates.coords.latitude,
                        longitude: coordinates.coords.longitude,
                    };
                    console.log(p);
                }).catch(e => {
                    console.log(e);
                });

                this.http.get('http://dummy.restapiexample.com/api/v1/employee/1').subscribe((res) => {
                    console.log(res);
                });
            }, 5 * 1000)

            this.backgroundMode.on('enable').subscribe(() => {
                console.log('background mode enabled event')

                // this.backgroundMode.disableBatteryOptimizations();
            })

            this.backgroundMode.on('activate').subscribe(() => {
                console.log('background mode activated event')
                this.backgroundMode.disableWebViewOptimizations()
                // this.backgroundMode.configure({
                //     title: 'Withu tt Background',
                //     text: 'Withu tx Background',
                //     ticker: 'withu tk',
                //     hidden: false,
                // })
            })

            this.backgroundMode.on('failure').subscribe((res) => {
                console.log('background mode failure event', res)
            })
        })
    }
}
