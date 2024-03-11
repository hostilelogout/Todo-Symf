// @ts-ignore
export async function DeleteById(id) {
    const request = await fetch(`https://127.0.0.1:8000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
}