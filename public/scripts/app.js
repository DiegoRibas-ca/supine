$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name_rest).appendTo($("body"));
    }
  });;
});

//CALCULATE THE TOTAL PRICE WITH JQUERY

// $(document).ready(function () {

//   $('.new-tweet textarea').on('keyup', function () {
//     const maxLength = 140;
//     let length = $(this).val().length;
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
