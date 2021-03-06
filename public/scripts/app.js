console.log("Sanity Check: JS is working!");
let $searchItems;
let allSearches = [];
let $nutrientResults;
let nutrientsInItem = {};
// let searchAuto = true;
let foodToSearch = "";
let modalInput = "";
// let $listResults;
// let listItems = [];


$(document).ready(function() {
  $searchItems = $('#searchResults');
  $nutrientResults = $('#nutrientResults');
  // $listResults = $('#foodList');

//////////// return nutrient information ///////////
  $('#searchForm').on('submit', function(e) {
    e.preventDefault();
    $nutrientResults.empty();
    // searchAuto = true;
    $.ajax({
    method:   'POST'
    ,url:     '/search/nutrients'
    ,data:    $(this).serialize()
    ,success: onSuccess
    ,error:   onError
  });
    $searchItems.empty();
    $('#searchInput').val('');
  });

//// search nutrients with specified quantity ////
  $("#submitModalForm").on("click", function(e) {
    e.preventDefault();
    if (modalInput) {
      $('#searchInput').val(modalInput + ' ' + foodToSearch);
      $('#searchForm').submit();
    $('#foodQuantity').val('');
    }
  });

//////////// store food in user's db ////////////
  $(document).on("click", "#saveItem", function(e) {
    $nutrientResults.empty();
    // searchAuto = true;
    $.ajax({
      method:   'POST'
      ,url:     '/search/item'
      ,data:    nutrientsInItem
      ,success: nutrientPostSuccess
      ,error:   nutrientPostError
    });
  });

//////////// populate autocomplete list ///////////
  $(document).on("click", ".quickSearch", function(e) {
    // searchAuto = false;
    $searchItems.empty();
    $("#foodNameHTML").text(this.dataset.name);
    foodToSearch = this.dataset.name;
  });

//////////////// delete food from db ////////////////
  $(document).on("click", ".deleteFood", function(e) {
    $.ajax({
      method:   'DELETE'
      ,url:     `/search/item/${this.dataset.id}`
      ,success: deleteSuccess
      ,error:   deleteError
    }).then(() => {
      $(this).parent().parent().parent().remove();
    })
  });

////////////// remove food from list ///////////////
  $(document).on("click", ".removeItem", function(e) {
    $(this).parent().parent().parent().remove();
  });

///////////////// update profile /////////////////
  $("#updateProfile").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      method:   'PUT'
      ,url:     '/profile/edit'
      ,data:    $(this).serialize()
      ,success: updateSuccess
      ,error:   updateError
    })
  });
});

/////////////// render food list /////////////////
  // $.ajax({
  //   method:   'GET'
  //   ,url:     '/profile/api'
  //   ,success: listSuccess
  //   ,error:   listError
  // })

$('#foodInfo').on('shown.bs.modal', function() {
  $('#foodQuantity').focus();
});

$('#foodInfo').on('hidden.bs.modal', function() {
  $('#searchInput').focus();
});






