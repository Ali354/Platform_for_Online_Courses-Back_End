class UserVerification {
    constructor(userid,uniqueString, CreateAt, expiresAt) {
            this.userid = userid;
            this.uniqueString = uniqueString;
            this.CreateAt = CreateAt;
            this.expiresAt = expiresAt;
            //role
    }
}

module.exports = UserVerification;