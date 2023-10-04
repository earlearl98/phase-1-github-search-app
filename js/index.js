const form = document.getElementById("github-form");
const userList = document.getElementById("user-list");
const repoList = document.getElementById("repos-list");

//let us create an event listener step-wise

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const searchValue = document.getElementById("search").value;
  searchGitHubUsers(searchValue);
});

function searchGitHubUsers(username) {
  const apiUrl = `https://api.github.com/search/users?q=${username}`;
  fetch(apiUrl, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.items);
      displayUsers(data.items);
    })
    .catch((err) => {
      console.error("error", err);
    });
}

function displayUsers(users) {
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerHTML = `<img src='${user.avatar_url}' alt='${user.login}' width='50' height='50'>
    <a href='${user.html_url}' target='_blank'>${user.login}</a>
    `;
    li.addEventListener("click", function () {
      getUserRepos(user.login);
    });
    userList.appendChild(li);
  });
}

function getUserRepos(username) {
  const apiUrl = `https://api.github.com/users/${username}/repos`;
  fetch(apiUrl, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      displayRepos(data);
    })
    .catch((err) => {
      console.error("error", err);
    });
}

function displayRepos(repos) {
  repoList.innerHTML = "";
  repos.forEach((repo) => {
    const li = document.createElement("li");
    li.textContent = repo.name;
    repoList.appendChild(li);
  });
}
