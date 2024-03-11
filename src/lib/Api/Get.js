import { OnAddTask } from "$lib/TaskList";
import { onMount } from "svelte";

export async function FetchAll() {
    onMount(async () => {
        await fetch(`https://127.0.0.1:8000/api/tasks.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
            .then(response => response.json())
            .then(results => {
                if (results.length >= 1) {
                    for (let index = 0; index < results.length; index++) {
                        OnAddTask(
                            results[index].id,
                            results[index].taskid,
                            results[index].title,
                            results[index].description,
                            results[index].day,
                            results[index].active,
                            results[index].ongoing,
                            results[index].createdon,
                        );
                    }
                }
            })
    })

}