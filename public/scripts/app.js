
// after successful order, json data will be returned with 200 status code
// use this data to build order confirmation and payment page
function sucessOrder(data) {
  //console.log("price data", data);

  $("#menu-form").toggle();
  $('.main-menu').append($(`
  <section class="container" id="placeOrderScreen">
    <div class="order-response"></div>
      <div id='order-complete'>
        <h3 style="margin: 20px"> Thanks ${data.name} for your order!</h3>
        <h4 style="margin: 20px"> You will receive a confirmation text message to ${data.Phone}</h4>
        <p style="margin: 10px"> Your order is </p>
        <p style="margin: 10px"> ${data.Hamburgers} Hamburgers </p>
        <p style="margin: 10px"> ${data.Sushi} Sushi </p>
        <p style="margin: 10px"> ${data.Cokes} Cokes </p>
        <p style="margin: 10px"> ${data.Orange_Juice} OJs </p>
        <p style="margin: 10px"> Order Total ${data.Total} </p>
        <p style="margin: 10px"> Pay with card below or pay at pickup! </p>


    </div>
    <form action="/payment" method="POST">

      <script
        src="https://checkout.stripe.com/checkout.js" class="stripe-button"
        data-key="pk_test_Gn7A7t8oWM48sDDpAlzeAfhY"
        data-amount=${(data.Total) * 100}
        data-name="Supine Order Pickup"
        data-description="Mezzanine Restaurant"
        data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
        data-locale="auto"
        data-currency="cad">
     </script>
    </form>
    <button id='gobackhome'>Back Home</button>
  </section>

  `));
// go home button if user does not want to pre pay
  $("#gobackhome").click(function () {
    window.location.replace("http://localhost:8080/");
  });

}

let totalPrice = 0;
let priceHamb = Math.round((12*1.13) * 100)/100;
let priceSushi = Math.round((11*1.13) * 100)/100;
let priceCoke = Math.round((2*1.13) * 100)/100;
let priceJuice = Math.round((3*1.13) * 100)/100;

$(document).ready(function () {

  $(".item-list").val(0);

// On order submit button
  $('#orderButton').on('submit', function (event) {
    //prevent default form submission, lets control this ourselves with ajax
    event.preventDefault();
    let body = $(this).serialize();

// set error message with empty order fields
    console.log($('#user_phone').val().length);
    if ($('#total-price').val() < 1){
      alert("You have failed to meet the $1 minimum order");
    } else if ($('#user_name').val() === "" || $('#user_name').val() === null) {
        alert("Please input your name or Ill call you null!");
    } else if  ($('#user_phone').val().length !== 10) {
        alert("Hey you...whats your (real) number");
    } else {
      //if succesful, send ajax request to POST /order
      $.ajax({
        type: "POST",
        url: '/order',
        data: body,
        success: sucessOrder
      });
    }
  })

// calc total price via key up or click

  $(".item-list").click(function() {
    totalPrice = 0;
    totalPrice += $("#item1").val() * priceHamb;
    totalPrice += $("#item2").val() * priceSushi;
    totalPrice += $("#item3").val() * priceCoke;
    totalPrice += $("#item4").val() * priceJuice;
    $('#total-price').val(totalPrice);
  });

  $(".item-list").keyup(function () {
    totalPrice = 0;
    totalPrice += $("#item1").val() * priceHamb;
    totalPrice += $("#item2").val() * priceSushi;
    totalPrice += $("#item3").val() * priceCoke;
    totalPrice += $("#item4").val() * priceJuice;
    $('#total-price').val(totalPrice);
  });



});

