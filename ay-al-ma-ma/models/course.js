class Course {
    constructor(id, title, description, defTime, lessonsNum,owner_id, imgURL) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.defTime = defTime;
            this.lessonsNum = lessonsNum;
            this.owner_id = owner_id;
            this.imgURL= imgURL;
    }
}
 
module.exports = Course;
