class Comment {
    constructor(id,owner_id,course_id, lesson_id,text,likes,disLikes) {
            this.id = id;
            this.owner_id= owner_id;
            this.course_id =course_id;
            this.lesson_id= lesson_id;
            this.text = text;
            // this.likes=likes;
            // this.disLikes=disLikes;
    }
}

module.exports = Comment;