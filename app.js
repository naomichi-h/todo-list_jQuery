$(".js-todo-add").on("click", function (e) {
  e.preventDefault();

  const text = $(".js-add-text").val();

  $(".js-add-text").val("");

  if (!text) {
    $(".js-text-empty").show();
    return;
  }

  $(".js-text-empty").hide();

  console.log(text);

  const listItem =
    '<li class="todo-list-item todo-list-item__todo" data-text="' +
    text +
    '">' +
    '<i class="far fa-square todo-icon js-click__todo"></i>' +
    '<span class="todo-list-text js-click-edit">' +
    text +
    "</span>" +
    '<input type="text" class="todo-list-edit js-list-editForm" value="' +
    text +
    '" />' +
    '<i class="fas fa-trash-alt js-click__trash"></i></li>';

  console.log(listItem);

  $(".todo-list").prepend(listItem);
});

$(document).on("click", ".js-click__todo", function () {
  $(this)
    .removeClass("far")
    .removeClass("fa-square")
    .addClass("fas")
    .addClass("fa-check-square")
    .removeClass("js-click__todo")
    .addClass("js-click__done")
    .closest(".todo-list-item")
    .removeClass("todo-list-item__todo")
    .addClass("todo-list-item__done");
});

$(document).on("click", ".js-click__done", function () {
  $(this)
    .removeClass("fas")
    .removeClass("fa-check-square")
    .addClass("far")
    .addClass("fa-square")
    .removeClass("js-click__done")
    .addClass("js-click__todo")
    .closest(".todo-list-item")
    .removeClass("todo-list-item__done")
    .addClass("todo-list-item__todo");
});

$(document).on("click", ".js-click__trash", function () {
  $(this)
    .closest(".todo-list-item")
    .fadeOut("slow", function () {
      this.remove();
    });
});

$(document).on("click", ".js-click-edit", function () {
  $(this).hide().siblings(".js-list-editForm").show();
});

$(document).on("keyup", ".js-list-editForm", function (e) {
  if (e.keyCode === 13 && e.shiftKey) {
    const $this = $(this);

    $this
      .hide()
      .siblings(".todo-list-text")
      .text($this.val())
      .show()
      .closest(".todo-list-item")
      .attr("data-text", $this.val());
  }
});

$(document).on("keyup", ".js-todo-search", function () {
  const searchText = $(this).val();

  $(".todo-list-item")
    .show()
    .each(function (i, elm) {
      const text = $(elm).attr("data-text");
      const regexp = new RegExp("^" + searchText);

      if (text && text.match(regexp)) {
        return true;
      }
      $(elm).hide();
    });
});
