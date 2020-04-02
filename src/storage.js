export class Storage {

    static getSearched() {

        let users;
        if(!localStorage.getItem("searched")) {
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem("searched"));
        }
        return users;
    }

    static addSearched(username) {

        let users = this.getSearched();
        if(users.indexOf(username) == -1) {
            users.push(username);
        }
        localStorage.setItem("searched",JSON.stringify(users));
    }

    static deleteSearches() {

        localStorage.removeItem("searched");
    }
}