class Video {
    constructor(id,course_id, lesson_id,title,vidURL) {
            this.id = id;
            this.course_id =course_id;
            this.lesson_id= lesson_id;
            this.vidURL = vidURL;
            this.title=title;
    }
}

module.exports = Video;