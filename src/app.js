import {Storage} from './storage';
import {UI} from './ui';
import {Github} from './github';

//Selecting elements

let search = document.querySelector("#search-button");
let input = document.querySelector("#search-input");
let btn_history = document.querySelector("#history-button");
let history = document.querySelector("#history");
let deleteProfile = document.querySelector("#close-profile");
let filter = document.querySelector("#filterRepos");

//Git and ui object
let git = new Github();
let ui = new UI();

//Event listeners
const eventListeners = function() {

    search.addEventListener("click",function() {
        getData(null);
    });

    deleteProfile.addEventListener("click",function() {
        ui.deleteProfile();
    });

    history.addEventListener("click",function(event) {

        if(event.target.className == "list-group-item bg-secondary text-white d-flex justify-content-between") {
            input.value
            getData(event.target.textContent.trim());

        } else if(event.target.className == "fa fa-remove") {
            let history = Storage.getSearched();
            Storage.deleteSearches();
            let newHistory = [];
            for(const key of history) {
                if(key !== event.target.parentElement.textContent.trim()) {
                    newHistory.push(key);
                    Storage.addSearched(key);
                }
            }
            event.target.parentElement.remove();
        }
    });
    
    filter.addEventListener("keyup",filterRepos);
    btn_history.addEventListener("click",clerarHistory);
    document.addEventListener("DOMContentLoaded",loadStorage);
}

function getData(check) {

    let userName;
    
    if(!check) {
        userName = input.value;
    } else {
        userName = check;
    }

    if(!userName) {
        ui.alert("secondary","Lütfen kullanıcı adı giriniz");
    } else {
        git.getData(userName)
        .then(response => {

            if(response.repos["message"] == "Not Found") {
                ui.alert("secondary","Aradığınız kullanıcı yok :( ama olmayacağı anlamına gelmez")
                console.clear();
            } else {
                ui.setHistory(userName);
                Storage.addSearched(userName);
                history.parentElement.parentElement.hidden = false;
                ui.setProfile(response.user);
                ui.setRepos(response.repos);
            }
        })
        .catch(err => console.error(err));
    }
    ui.clearInput();
}

function filterRepos(event) {
                    
    ui.filterRepos(event.target.value);
}

function loadStorage() {

    let search = Storage.getSearched();

    if(search[0]) {
        history.parentElement.parentElement.hidden = false;
    } else {
        history.parentElement.parentElement.hidden = true;
    }

    let result = '';
        
    for(const name of search) {

        result += 
        `
            <li class="list-group-item bg-secondary text-white d-flex justify-content-between">
                <h6>${name}</h6>
                <a class="fa fa-remove"></a>
            </li>
        `
    }

    history.innerHTML = result;
}

function clerarHistory() {

    if(confirm("Tüm arama geçmişi temizlensin mi ?")) {
        history.innerHTML = '';
        Storage.deleteSearches();
        ui.alert("light","Arama geçmişini sildin haberin olsun");
        history.parentElement.parentElement.hidden = true;
    }
}

eventListeners();