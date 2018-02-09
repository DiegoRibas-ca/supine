//CALCULATE THE TOTAL PRICE WITH JQUERY
function sucessOrder(data) {
  console.log(data);
  $(".menu-container").toggle();
  $('.order-response').append($("<p id='order-complete'></p>").text(data));
  $('.order-response').append($("<button id='gobackhome'>Back to Home</button>").val('Back to Home'));
  $("#gobackhome").click(function () {
    window.location.replace("http://localhost:8080/");
  });

}
let totalPrice = 0;
let priceHamb = 12;
let priceSushi = 11;
let priceCoke = 2;
let priceJuice = 3;

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

