class Lesson {
    constructor(id,Course_id, title, description, defTime,owner_id,imgURL,likes,disLikes) {
            this.id = id;
            this.Course_id=Course_id;
            this.title = title;
            this.description = description;
            this.defTime = defTime;
            this.owner_id = owner_id;
            this.imgURL = imgURL;
            this.likes=likes;
            this.disLikes=disLikes;
    }
}

module.exports = Lesson;