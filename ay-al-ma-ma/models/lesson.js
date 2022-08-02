class Lesson {
    constructor(id,Course_id, title, description, defTime,owner_id) {
            this.id = id;
            this.Course_id=Course_id;
            this.title = title;
            this.description = description;
            this.defTime = defTime;
            this.owner_id = owner_id;
    }
}

module.exports = Lesson;