const listMessages = document.querySelector("#tbody") as HTMLElement;
const titleInput = document.querySelector("#title") as HTMLInputElement;
const descriptionInput = document.querySelector(
  "#description"
) as HTMLInputElement;

const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "[]");
console.log(loggedUser);

interface Imessage {
  id: number;
  title: string;
  description: string;
}

if (!loggedUser) {
  window.location.href = "./index.html";
}

const logOut = () => {
  localStorage.removeItem("loggedUser");
  window.location.assign("./index.html");
};

function searchMessages(): Array<any> {
  const user = JSON.parse(localStorage.getItem(loggedUser.email) || "[]");
  return user;
}

function defineID(messages: Array<any>) {
  let identifiers = [];

  for (const message of messages) {
    identifiers.push(message.id);
  }

  let maiorID = identifiers.reduce(function (a, b) {
    return Math.max(a, b);
  }, 0);

  return maiorID;
}

const registerMessage = () => {
  let title = titleInput.value;
  let description = descriptionInput.value;

  const messages = JSON.parse(localStorage.getItem(loggedUser.email) || "[]");

  messages.push({
    id: defineID(messages) + 1,
    title,
    description,
  });

  localStorage.setItem(loggedUser.email, JSON.stringify(messages));
  window.location.reload();
};

const reloadList = () => {
  const messages = searchMessages();

  listMessages.innerHTML = "";

  for (const message of messages) {
    let tr = document.createElement("tr");

    let tdId = document.createElement("td");
    tdId.innerText = `${message.id}`;

    let tdTitle = document.createElement("td");
    tdTitle.innerText = `${message.title}`;

    let tdDescription = document.createElement("td");
    tdDescription.innerText = `${message.description}`;

    let tdButton = document.createElement("td");

    let buttonEdit = document.createElement("button");

    buttonEdit.classList.add("btn", "btn-dark", "mx-1");
    buttonEdit.setAttribute("onclick", `editMessage(${message.id})`);
    buttonEdit.setAttribute("data-bs-toggle", "modal");
    buttonEdit.setAttribute("data-bs-target", "#editModal");

    let edit = document.createElement("i");
    edit.classList.add("bi", "bi-pencil-square");

    buttonEdit.appendChild(edit);

    let buttonDelete = document.createElement("button");

    buttonDelete.classList.add("btn", "btn-dark", "mx-1");
    buttonDelete.setAttribute("onclick", `deleteMessage(${message.id})`);

    let del = document.createElement("i");
    del.classList.add("bi", "bi-trash");

    buttonDelete.appendChild(del);

    listMessages.appendChild(tr);
    tr.appendChild(tdId);
    tr.appendChild(tdTitle);
    tr.appendChild(tdDescription);
    tdButton.appendChild(buttonEdit);
    tdButton.appendChild(buttonDelete);
    tr.appendChild(tdButton);
  }
};

const deleteMessage = (id: number) => {
  const messages = JSON.parse(localStorage.getItem(loggedUser.email) || "[]");
  const identifiersMessage = messages.findIndex(
    (message: any) => message.id === id
  );
  if (identifiersMessage < 0) {
    return;
  }
  messages.splice(identifiersMessage, 1);
  localStorage.setItem(loggedUser.email, JSON.stringify(messages));
  reloadList();
};

const editMessage = (id: number) => {
  const editTitle = document.querySelector("#editTitle") as HTMLInputElement;
  const editDescription = document.querySelector(
    "#editDescription"
  ) as HTMLInputElement;
  const saveButton = document.querySelector(
    "#saveEditMessageButton"
  ) as HTMLButtonElement;

  const messages = searchMessages();

  const identifiersMessage = messages.findIndex(
    (message: any) => message.id === id
  );

  editTitle.value = messages[identifiersMessage].title;
  editDescription.value = messages[identifiersMessage].description;

  saveButton.setAttribute(
    "onclick",
    `saveEditMessage(${messages[identifiersMessage].id})`
  );
};

const saveEditMessage = (id: number) => {
  const editedTitle = document.querySelector("#editTitle") as HTMLInputElement;
  const editedDescription = document.querySelector(
    "#editDescription"
  ) as HTMLInputElement;
  const title = editedTitle.value;
  const description = editedDescription.value;

  const messages = searchMessages();

  const identifierMessage = messages.findIndex((message) => message.id === id);

  messages[identifierMessage].title = title;
  messages[identifierMessage].description = description;

  localStorage.setItem(loggedUser.email, JSON.stringify(messages));

  window.location.reload();
};

document.addEventListener("DOMContentLoaded", reloadList);
