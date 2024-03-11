<script context="module">
	import { writable } from 'svelte/store';

	let state = false;
	let currentTaskId = 0;

	const ToggleState = writable(state);
	const GetTaskID = writable(currentTaskId);

	// @ts-ignore
	export function EditToggle(taskId) {
		state = !state;
		ToggleState.set(state);
		GetTaskID.set(taskId);
	}

	function Cancel() {
		state = !state;
		ToggleState.set(state);
	}
</script>

<script>
	import {
		Button,
		ButtonGroup,
		Modal,
		ModalBody,
		ModalFooter,
		ModalHeader
	} from '@sveltestrap/sveltestrap';
	import { Input } from '@sveltestrap/sveltestrap';
	import { OnDeleteTask, OnEditTask, OnGetTask, Tasks } from '$lib/TaskList';
	import { PatchById } from '$lib/Api/Patch';

	let open = false;

	let title = '';
	let description = '';
	let day = "";
	let completed = false;
	let ongoing = false;

	let currentTask = Tasks[0];

	ToggleState.subscribe((newState) => {
		open = newState;
	});
	

	GetTaskID.subscribe((currentTaskId) => {
		currentTask = OnGetTask(currentTaskId) ?? Tasks[0];
		title = currentTask?.title ?? '';
		description = currentTask?.description ?? '';
		completed = currentTask?.completed;
		ongoing = currentTask?.ongoing;
		day = currentTask?.day;
	});

	function EditTask() {
		currentTask.title = title;
		currentTask.description = description;
		currentTask.active = !completed;
		currentTask.ongoing = ongoing;

		OnEditTask(currentTask);
		PatchById(currentTask);
		Cancel();
	}
	function Reset() {
		title = '';
		description = '';
		completed = false;
		ongoing = false;
	}
	function DeleteTask() {
		OnDeleteTask(currentTask);
		Cancel();
		Reset();
	}
</script>

<div>
	<Modal isOpen={open} backdrop={false}>
		<ModalHeader>Modal title</ModalHeader>
		<ModalBody>
			<div class="d-flex w-100 align-items-center justify-content-between">
				<strong class="mb-1">
					<Input placeholder="Title" bind:value={title} />
				</strong>
				<small class="text-body-secondary">{day}</small>
			</div>
			<div class="col-10 mb-1 small">
				<Input type="textarea" bind:value={description} placeholder="Description" />
			</div>
			<Input type="checkbox" bind:checked={completed} label="Completed?" />
			<Input type="checkbox" bind:checked={ongoing} label="Start Task" />
		</ModalBody>
		<ModalFooter>
			<Button color="primary" on:click={EditTask}>Edit</Button>
			<Button color="secondary" on:click={Cancel}>Cancel</Button>
			<Button color="btn btn-danger" on:click={DeleteTask}>Delete</Button>
		</ModalFooter>
	</Modal>
</div>
