"use strict";
var todoForm = document.querySelector(".form"),
    formInput = document.querySelector(".form>input"),
    formButton = document.querySelector(".form>button"),
    listItems = document.querySelector(".list-items"),
    todoList = {};
function animeFormButton(a) {
    a.classList.add("formButton-active"),
        setTimeout(function () {
            return a.classList.remove("formButton-active");
        }, 500);
}
function trash() {
    var b = this;
    this.parentNode.style.opacity = 0;
    var a = this.parentNode.getAttribute("data-key");
    setTimeout(function () {
        b.parentNode.remove(), delete todoList[a], saveHTML();
    }, 600);
}
function check() {
    this.parentNode.classList.toggle("flip"), (this.innerHTML = "\u2714\uFE0F" === this.innerHTML ? "\uD83D\uDD04" : "\u2714\uFE0F");
    var a = this.parentNode.getAttribute("data-key");
    (todoList[a].checked = !todoList[a].checked), saveHTML();
}
function saveHTML() {
    window.localStorage.setItem("data", JSON.stringify(todoList));
}
function loadHTML() {
    if (window.localStorage.getItem("data")) {
        var a = JSON.parse(window.localStorage.getItem("data"));
        (todoList = a),
            Object.keys(todoList).map(function (b) {
                return createHTML(todoList[b], b);
            });
    }
}
function createHTML(a, b) {
    if (a.todo) {
        var c = "\n      <span>" + a.todo + '</span>\n      <button name="trash" class="trash">\uD83D\uDDD1\uFE0F</button>\n      <button name="check" class="check">' + (a.checked ? "\uD83D\uDD04" : "\u2714\uFE0F") + "</button>\n  ",
            d = document.createElement("li");
        d.classList.add("item", a.checked ? "flip" : null), d.setAttribute("data-key", b), (d.innerHTML = c), listItems.insertBefore(d, listItems.firstChild), (d.children.trash.onclick = trash), (d.children.check.onclick = check);
    }
}
function createItem(a) {
    a.preventDefault(), animeFormButton(formButton);
    var b = Date.now();
    (todoList[b] = { todo: formInput.value, checked: !1 }), createHTML(todoList[b], b), saveHTML(), this.reset();
}
window.addEventListener("load", loadHTML), todoForm.addEventListener("submit", createItem);
