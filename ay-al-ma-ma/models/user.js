class User {
    constructor(id, userName, email, password,verified) {
            this.id = id;
            this.userName = userName;
            this.email = email;
            this.password = password;
            this.verified= verified;
            //role
    }
}

module.exports = User;