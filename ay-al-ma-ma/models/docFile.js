class DocFile {
    constructor(id,lesson_id,Course_id,title, FileURL) {
            this.id = id;
            this.lesson_id=lesson_id;
            this.Course_id=Course_id;
            this.title = title;
            this. FileURL= FileURL;
    }
}
 
module.exports = DocFile;