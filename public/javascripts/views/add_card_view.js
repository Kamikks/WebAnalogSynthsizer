//Views
//$('<div>').addClass('modal fade')
//          .attr('id', 'myModal')
//          .attr('tabindex', '-1')
//          .attr('role', 'dialog')
//          .append($('<div>')
//                    .addClass('modal-dialog')
//                    .attr('role', 'document')
//                    .append($('<div>')
//                              .addClass('modal-content')
//                              .append($('<div>')
//                                        .addClass('modal-header')
//                                        .append($('<h4>')
//                                                  .addClass('modal-title')
//                                                  .attr('id', 'modal-label')
//                                                  .html('Add Card')
//                                        )
//                              )
//                              .append($('<div>')
//                                        .addClass('modal-body')
//                                        .append($('<div>')
//                                                   .addClass('btn-group-vertical')
//                                                   .attr('id', 'cardSelector')
//                                                   .attr('data-toggle', 'buttons')
//                                                   .append($('<label>')
//                                                              .addClass('btn btn-primary active')
//                                                              .append('<
$(function() {
  $("#myModal").on('click', '.modal-footer .btn-primary', function() {
    console.log("submit");
    $("#myModal").modal("hide");
    selected = $("input[name=cardSelector]:checked").val();
    addCard(selected);
  });
});

