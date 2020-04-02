import {Storage} from './storage';

export class UI {

    constructor() {

        this.profile = document.querySelector("#profile");
        this.repos = document.querySelector("#repos");
        this.history = document.querySelector("#history");
        this.input = document.querySelector("#search-input");
    }

    alert(type,message) {

        let div = document.createElement("div");
        div.className = `alert alert-${type}`;
        div.setAttribute("role","alert");
        div.textContent = message;
        document.querySelector("#alert-container").hidden = false;
        document.querySelector("#alert-container").appendChild(div);
        setTimeout(function() {
            document.querySelector("#alert-container").hidden = true;
            div.remove();
        },2000);
    }

    clearInput() {

        this.input.value = '';
    }

    setProfile(user) {

        let parent = this.profile.parentElement.parentElement;
        parent.hidden = false;
        this.profile.innerHTML = 
        `                
        <div class="row">
            <div class="col-md-4">
                <a href="${user["html_url"]}" target="_blank">
                    <img class="img-fluid mb-2" src=${user["avatar_url"]}>
                </a>
                <hr color="gray">
                <div class="full-name">
                    <i><span>İsim :</span></i>
                    <br>
                    <strong>${user["name"]}</strong>
                </div>
                <hr color="gray">
                <div class="bio">
                    <i><span>Bio:</span></i>
                    <br>
                    ${user["bio"]}
                </div>
            </div>
            <div class="col-md-8">
                <div class="container" style="text-align: center;">
                    <div class="btn btn-light" role="button">
                        Takipçi : <span class="badge badge-dark">${user["followers"]}</span>
                    </div>
                    <div class="btn btn-light" role="button">
                        Takip Edilen : <span class="badge badge-dark">${user["following"]}</span>
                    </div>
                    <div class="btn btn-light">
                        Repolar : <span class="badge badge-dark">${user["public_repos"]}</span>
                    </div>
                </div>
                <hr color="gray" width="76%" align="center">
                <div class="list-group" style="max-width: 76%; margin-left: auto; margin-right: auto;">
                    <li class="list-group-item borderzero">
                        <img src="resimler/company.png" width="30px"> <span style="color: black;">${user["company"]}</span>
                    </li>
                    <li class="list-group-item borderzero">
                        <img src="resimler/location.png" width="30px"> <span style="color: black;">${user["location"]}</span>
                    </li>
                    <li class="list-group-item borderzero">
                        <img src="resimler/mail.png" width="30px"> <span style="color: black;">${user["email"]}</span>
                    </li>
                    <li class="list-group-item borderzero">
                        <img src="resimler/octicon.png" width="30px"> <span style="color: black;"><a href=${user["blog"]} target="_blank" style="color: black;">Kişisel Site</a></span>
                    </li>
                </div>
            </div>
        </div>
        <hr color="gray">
        <div class="card-footer">
            <p>Last Update : <span>${user["updated_at"]}</span></p>
        </div>
    ` 
    }

    setRepos(user) {

        this.repos.innerHTML = '';
        for(const repo of user) {
            
            this.repos.innerHTML += 
            `   <div id="row-container">
                    <div class="row">
                        <div class="col-md-9">
                            <div class="alert alert-light">
                                <a href="${repo["html_url"]}" target="_blank" id="repoName" style="color: black";>${repo["name"]}</a>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-light">
                                Starlar <span class="badge badge-dark" id="repoStar">${repo["stargazers_count"]}</span>
                            </button>
                            <button class="btn btn-secondary">
                                Forklar <span class="badge badge-dark">${repo["forks_count"]}</span>
                            </button>
                        </div>
                    </div>
                    <hr color="gray">
                </div>
            `;
        }
    }

    filterRepos(value) {

            // let formControl = document.querySelector("#filter");
            // let filterValue = formControl.value.toLowerCase();
            // let tbody = document.querySelector("#films").childNodes;
            // tbody.forEach(movie => {
            //     let titles = movie.children[1].textContent.toLowerCase();
            //     if(titles.indexOf(filterValue) === -1){
            //         movie.hidden = true;
            //     }else{
            //         movie.hidden = false;
            //     }
            // });
        value = value.toLowerCase();
        let repos = document.querySelectorAll("#row-container");
        // console.log(repos);
        repos.forEach(repo => {
            
            let title = repo.children[0].children[0].textContent.toLowerCase().trim();
            if(title.indexOf(value) === -1) {
                repo.hidden = true;
            } else {
                repo.hidden = false;
            }
        });
    }

    setHistory(username) {

        let users = Storage.getSearched();
        if(users.indexOf(username) == -1) {

            let searchList = document.querySelector("#history");
            searchList.innerHTML += 
            `
                <li class="list-group-item bg-secondary text-white d-flex justify-content-between">
                    <h6>${username}</h6>
                    <a class="fa fa-remove"></a>
                </li>
            `
        }
    }

    deleteProfile() {

        let parent = this.profile.parentElement.parentElement;
        parent.hidden = true;
        this.profile.innerHTML = '';
        let repos = this.repos.parentElement;
        if(repos) {
            repos.innerHTML = '';
        }
    }

    // inf() {
    //     console.log(this.profile,this.repos,this.history,this.input);
    // }
}

// let i = new UI();

// i.inf();