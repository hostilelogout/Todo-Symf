export class Task {
    // @ts-ignore
    constructor(id,taskid, title, description, day, active, ongoing, createdon) {
        this.id = id;
        this.taskid = taskid;
        this.title = title;
        this.description = description;
        this.day = day;
        this.active = active;
        this.ongoing = ongoing;
        this.createdon = createdon;
    }
}