class User {
    constructor(id, userName, email, password, roleName, imgURL, points) {
            this.id = id;
            this.userName = userName;
            this.email = email;
            this.password = password;
            this.roleName = roleName;
            this.imgURL = imgURL;
            this.points = points;
            // this.verified= verified;
            //role
    }
}

module.exports = User;