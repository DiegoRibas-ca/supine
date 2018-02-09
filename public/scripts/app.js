

// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name_rest).appendTo($("body"));
//     }
//   });;
// });

//CALCULATE THE TOTAL PRICE WITH JQUERY

$(document).ready(function () {
  let totalQuantity = 0;
  let totalPrice;

  $(".item1").click(function() {
    totalQuantity = $(".item1").val()
    totalPrice = totalQuantity * 12
    $('#total-price').text(totalPrice);
  });
  $(".item1").keyup(function () {
    totalQuantity = $(".item1").val()
    totalPrice = totalQuantity * 12
    $('#total-price').text(totalPrice);
  });
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
