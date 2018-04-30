import { Component, AfterViewChecked } from '@angular/core';
import { environment } from '../../../environments/environment';
declare let paypal: any;

@Component({
    selector: 'paypal-form',
    templateUrl: './paypal.component.html',
    styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements AfterViewChecked {
    title = 'app';

    public didPaypalScriptLoad: boolean = false;
    public loading: boolean = true;

    public paymentAmount: number = 100;

    public paypalConfig: any = {
        style: {
            size: 'medium', 
            color: 'blue', 
            shape: 'rect'
        },
        env: environment.paypal_env,
        client: {
            sandbox: environment.paypal_clientID,
            production: environment.paypal_clientID
        },
        commit: true,
        payment: (data, actions) => {
            return actions.payment.create({
                payment: {
                    transactions: [
                        { amount: { total: this.paymentAmount, currency: 'CAD' } }
                    ]
                }
            });
        },
        onAuthorize: (data, actions) => {
            return actions.payment.execute().then((payment) => {
                // show success page
            });
        }
    };

    public ngAfterViewChecked(): void {
        if (!this.didPaypalScriptLoad) {
            this.loadPaypalScript().then(() => {
                paypal.Button.render(this.paypalConfig, '#paypal-button');
                this.loading = false;
            });
        }
    }

    public loadPaypalScript(): Promise<any> {
        this.didPaypalScriptLoad = true;
        return new Promise((resolve, reject) => {
            const scriptElement = document.createElement('script');
            scriptElement.src = 'https://www.paypalobjects.com/api/checkout.js';
            scriptElement.onload = resolve;
            document.body.appendChild(scriptElement);
        });
    }
}