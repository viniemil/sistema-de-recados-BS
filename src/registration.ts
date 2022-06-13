const inputName = document.getElementById("name") as HTMLInputElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;
const inputPassConfirm = document.getElementById(
  "passConfirm"
) as HTMLInputElement;
const registerButton = document.getElementById("button") as HTMLButtonElement;

function checkName(name: string): boolean {
  if (name.length >= 3) {
    return true;
  }

  return false;
}

function checkEmail(email: string): boolean {
  if (email) {
    return true;
  }

  return false;
}

function checkPassword(password: string, passConfirm: string): boolean {
  if (password === passConfirm && password) {
    return true;
  }

  return false;
}

function showAlertRegister(message: string, type: string): void {
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
  }, 3000);
}

function searchUsersRegister() {
  const localStorageUsuarios = JSON.parse(
    localStorage.getItem("users") as string
  );
  let users = localStorageUsuarios ?? [];

  return users;
}

function createUser() {
  if (!checkName(inputName.value)) {
    return showAlertRegister("Insira um nome válido", "warning");
  }

  if (!checkEmail(inputEmail.value)) {
    return showAlertRegister("Insira um e-mail válido!", "warning");
  }

  if (!checkPassword(inputPassword.value, inputPassConfirm.value)) {
    return showAlertRegister("Insira uma senha válida", "warning");
  }

  const newUser: Iuser = {
    name: inputName.value,
    email: inputEmail.value,
    pass: inputPassword.value,
  };

  const users = searchUsersRegister();

  const existigUser = users.some((user: Iuser) => user.email === newUser.email);
  if (existigUser) {
    return showAlertRegister(
      `O email ${newUser.email} não está disponível.`,
      "warning"
    );
  }

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  showAlertRegister(
    `A conta de ${newUser.email} foi cadastrada com sucesso!`,
    "success"
  );

  setTimeout(() => {
    window.location.href = "./index.html";
  }, 3000);
}
