export class Github {

    constructor() {

        this.url = "https://api.github.com/users/";
    }

    async getData(username) {

        const responseUser = await window.fetch(this.url + username);
        const responseRepos = await window.fetch(this.url + username + "/repos");

        let userData = await responseUser.json();
        let reposData = await responseRepos.json();

        return {
            user:userData,
            repos:reposData
        };
    }
}