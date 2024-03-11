import { OnAddTask } from "$lib/TaskList";
// @ts-ignore
export async function PostByTask(task) {
    const request = await fetch("https://127.0.0.1:8000/api/tasks", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            taskid: task.taskid,
            title: task.title,
            description: task.description,
            day: task.day,
            active: task.active,
            ongoing: task.ongoing,
            createdat: task.createdon,
        })
    })
        .then(response => response.json())
        .then(results => {
            OnAddTask (
                results.id,
                results.taskid,
                results.title,
                results.description,
                results.day,
                results.active,
                results.ongoing,
                results.createdat,
            );
            return;
        });
}