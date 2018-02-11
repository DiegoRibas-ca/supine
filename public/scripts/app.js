//CALCULATE THE TOTAL PRICE WITH JQUERY
function sucessOrder(data) {
  console.log("price data", data);
  $(".menu-container").toggle();
  $('.order-response').append($(`
  <div id='order-complete'>
  <h3 style="margin: 30px"> Thanks ${data.name} for your order!</h3>
  <h4 style="margin: 20px"> You will receive a confirmation text message to ${data.Phone}</h4>
  <p style="margin: 10px"> Your order is </p>
  <p style="margin: 10px"> ${data.Hamburgers} Hamburgers </p>
  <p style="margin: 10px"> ${data.Sushi} Sushi </p>
  <p style="margin: 10px"> ${data.Cokes} Cokes </p>
  <p style="margin: 10px"> ${data.Orange_Juice} OJs </p>
  <p style="margin: 10px"> Order Total ${data.Total} </p>
  <p style="margin: 10px"> Pay with card below or pay at pickup!</p>


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

  `));
  $('.order-response').append($("<button id='gobackhome'>Back Home</button>"));
  $("#gobackhome").click(function () {
    window.location.replace("http://localhost:8080/");
  });

}

let totalPrice = 0;
let priceHamb = Math.round((12*1.13) * 100)/100;
let priceSushi = Math.round((11*1.13) * 100)/100;
let priceCoke = Math.round((3*1.13) * 100)/100;
let priceJuice = Math.round((2*1.13) * 100)/100;

$(document).ready(function () {

  $(".item-list").val(0);

  $('#orderButton').on('submit', function (event) {
    event.preventDefault();
    let body = $(this).serialize();

    console.log($('#user_phone').val().length);
    if ($('#user_phone').val().length !== 10) {
      alert("Sorry, your phone number must have 10 digits");
    } else if ($('#user_name').val() === "" || $('#user_name').val() === null) {
        alert("Sorry, you must type your name");
    } else if ($('#total-price').val() < 1) {
        alert("Sorry, you should make a order first");
    } else {
      $.ajax({
        type: "POST",
        url: '/order',
        data: body,
        success: sucessOrder
      });
    }
  })



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

