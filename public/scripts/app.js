

// $(() => {
//   $.ajax({
//     method: "POST",
//     url: "/order"
//   }).done((users) => {

//     for(user of users) {
//       $("<div>").text(user.name_rest).appendTo($("body"));
//     }
//   });;
// });

//CALCULATE THE TOTAL PRICE WITH JQUERY

$(document).ready(function () {

  $('#orderButton').on('submit', function (event) {
    event.preventDefault();
    let body = $(this).serialize();
    console.log("serialize data", body)
    $.ajax({
      type: "POST",
      url: '/order',
      data: body,
      success: sucessOrder
    });

  })


  function sucessOrder(data) {
    console.log("success data", data);
    $(".menu-container").toggle();
    $('.order-response').append($(`
      <h3 style="margin: 30px"> Thanks ${data.name} for your order!</h3>
      <h4 style="margin: 20px"> You will receive a confirmation text message to ${data.Phone}</h4>
      <p style="margin: 10px"> Your order is </p>
      <p id='order-complete' style="margin: 10px"> ${data.Hamburgers} Hamburgers </p>
      <p style="margin: 10px"> ${data.Sushi} Sushi </p>
      <p style="margin: 10px"> ${data.Cokes} Cokes </p>
      <p style="margin: 10px"> ${data.Orange_Juice} OJs </p>
      `));


    $('.order-response').append($("<button id='#gobackhome'>Back to Home</button>").val('Back to Home'));

  }












  let totalPrice = 0;
  let priceHamb = 12;
  let priceSushi = 11;
  let priceCoke = 2;
  let priceJuice = 3;
  $(".item-list").val(0);


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














  // $(".item-list").click(function () {
  //   totalPrice = 0;
  //   totalPrice = + $("#item1").val() * priceHamb;
  //   totalPrice = + $("#item2").val() * priceSushi;
  //   totalPrice = + $("#item3").val() * priceCoke;
  //   totalPrice = + $("#item4").val() * priceJuice;
  //   $('#total-price').text(totalPrice);
  // });
  // $('.item1').on('click', function () {
  //   // const maxLength = 140;
  //   let totalQuantity =+ $(this).val()
  //   $('#total-price').text(totalQuantity);
  //   alert('changed');
  // })
})
//     let $counter = $(this).siblings('span');
//     $counter.text(maxLength - length);

//     let characLeft = maxLength - length;

//     if (characLeft < 0) {
//       $counter.addClass("makeItRed");
//     } else {
//       $counter.removeClass("makeItRed");
//     };
//   });

// });
  //MAKE PROMISES AND INSERT TABLES
// $('.counter').text(140);
// $(".container .new-tweet").toggle('show');
// $('.new-tweet textarea').val('');
