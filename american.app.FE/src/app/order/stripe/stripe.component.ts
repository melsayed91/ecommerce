import { Component, OnInit, Output, EventEmitter } from '@angular/core';
declare var Stripe: any;

@Component({
  selector: 'stripe-form',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss']
})
export class StripeComponent implements OnInit {

  card: any;
  stripe: any;

  @Output() onTokenCreated = new EventEmitter();
  constructor() { }

  ngOnInit() {
    // Create a Stripe client.
    this.stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

    // Create an instance of Elements.
    var elements = this.stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '26px',
        fontFamily: '"Abel", "Roboto", "Helvetica", "Arial", sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '23px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    // Create an instance of the card Element.
    this.card = elements.create('card', { style: style });

    // Add an instance of the card Element into the `card-element` <div>.
    this.card.mount('#card-element');

    // Handle real-time validation errors from the card Element.
    this.card.addEventListener('change', function (event) {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    // Handle form submission.
    var form = document.getElementById('payment-form');
    form.addEventListener('submit', function (event) {
      // event.preventDefault();
    });
  }

  createToken() {
    console.log("Creating payment token")
    this.stripe.createToken(this.card).then((result) => {
      if (result.error) {
        // Inform the user if there was an error.
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // Send the token to your server.
        this.onTokenCreated.emit(result.token);
      }
    });
  }
}
