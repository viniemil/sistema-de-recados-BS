"use strict";
const userEmail = document.querySelector("#email");
const userPassword = document.querySelector("#password");
const loginButton = document.querySelector("#button");
function searchUsers() {
    const localStorageUsuarios = JSON.parse(localStorage.getItem("users"));
    let users = localStorageUsuarios ?? [];
    return users;
}
function login() {
    const users = searchUsers();
    const userFound = users.find((user) => user.email == userEmail.value && user.pass == userPassword.value);
    if (!userFound) {
        return showAlert("Usuário ou senha inválidos!", "danger");
    }
    localStorage.setItem("loggedUser", JSON.stringify(userFound));
    window.location.href = "./home.html";
}
function showAlert(message, type) {
    const alert = document.getElementById("alertPlace");
    alert.classList.remove("d-none");
    alert.classList.add(`alert-${type}`);
    alert.innerText = message;
    const wrapper = document.getElementById("wrapper");
    wrapper.classList.remove("d-none");
    wrapper.classList.add("wrapper");
    setTimeout(() => {
        alert.innerText = "";
        alert.classList.add("d-none");
        alert.classList.remove(`alert-${type}`);
    }, 2000);
}
