class User {
    constructor(id, firstName, email, password,verified) {
            this.id = id;
            this.userName = firstName;
            this.email = email;
            this.password = password;
            this.verified= verified;
            //role
    }
}

module.exports = User;