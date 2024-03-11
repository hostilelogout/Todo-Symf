// @ts-ignore
export async function PatchById(task) {
    const request = await fetch(`https://127.0.0.1:8000/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/merge-patch+json',
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
            console.log(results);
        });
}