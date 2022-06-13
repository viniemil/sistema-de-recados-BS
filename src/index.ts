const userEmail = document.querySelector("#email") as HTMLInputElement;
const userPassword = document.querySelector("#password") as HTMLInputElement;
const loginButton = document.querySelector("#button") as HTMLButtonElement;

interface Iuser {
  name: string;
  email: string;
  pass: string;
}

function searchUsers() {
  const localStorageUsuarios = JSON.parse(
    localStorage.getItem("users") as string
  );
  let users = localStorageUsuarios ?? [];

  return users;
}

function login() {
  const users = searchUsers();

  const userFound: Iuser = users.find(
    (user: Iuser) =>
      user.email == userEmail.value && user.pass == userPassword.value
  );

  if (!userFound) {
    return showAlert("Usuário ou senha inválidos!", "danger");
  }

  localStorage.setItem("loggedUser", JSON.stringify(userFound));

  window.location.href = "./home.html";
}

function showAlert(message: string, type: string): void {
  const alert = document.getElementById("alertPlace") as HTMLDivElement;
  alert.classList.remove("d-none");
  alert.classList.add(`alert-${type}`);
  alert.innerText = message;

  const wrapper: HTMLDivElement = document.getElementById(
    "wrapper"
  ) as HTMLDivElement;
  wrapper.classList.remove("d-none");
  wrapper.classList.add("wrapper");

  setTimeout(() => {
    alert.innerText = "";
    alert.classList.add("d-none");
    alert.classList.remove(`alert-${type}`);
  }, 2000);
}
