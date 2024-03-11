import { writable } from 'svelte/store';
import { Task } from './Task';
import { DeleteById } from './Api/Delete';

export const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// @ts-ignore
export let Tasks = [];

export const NewTask = writable(Tasks);
export const TaskUpdate = writable(Tasks);
export const TaskDelete = writable(Tasks);

// @ts-ignore
export function OnAddTask(id,taskid, title, description, day, active, ongoing, createdon) {
	Tasks = [...Tasks, new Task(id,taskid, title, description, day, active, ongoing, createdon)]
	NewTask.set(Tasks);
}
// @ts-ignore
export function OnEditTask(task) {
	for (let index = 0; index < Tasks.length; index++) {
		if (Tasks[index].taskid == task.taskid) {
			Tasks[index].title = task.title;
			Tasks[index].description = task.description;
		}
	}
	TaskUpdate.set(Tasks);
}
// @ts-ignore
export function OnDeleteTask (task){
	DeleteById(task.id);
	Tasks.splice(Tasks.findIndex(x => x.taskid == task.taskid),1);-
	TaskDelete.set(Tasks);
}
// @ts-ignore
export function OnGetTask(taskId) {
	return Tasks.find(x => x.taskid == taskId);
}
