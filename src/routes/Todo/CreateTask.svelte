<script context="module">
	import { writable } from 'svelte/store';

	let state = false;
	const ToggleState = writable(state);

	export function CreateToggle() {
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
	import { Tasks, weekday } from '$lib/TaskList';
	import { Task } from '$lib/Task';
	import { PostByTask } from '$lib/Api/Post';

	let open = false;

	ToggleState.subscribe((newState) => {
		open = newState;
	});

	let title = '';
	let description = '';
	let taskid;

	function Reset() {
		title = '';
		description = '';
	}

	function OnCreateTask() {
		title = title;
		description = description;
		taskid = 0;

		for (let index = 0; index < Tasks.length; index++) {
			if (Tasks[index].taskid > taskid)
				taskid = Tasks[index].taskid;
		}
		taskid += 1;
		// Create new Task with Dummy ID gets replaced by database.
		PostByTask(new Task(0,taskid,title,description,weekday[new Date().getDay()],true,false,new Date()));

		CreateToggle();
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
			</div>
			<div class="col-10 mb-1 small">
				<Input type="textarea" bind:value={description} placeholder="Description" />
			</div>
		</ModalBody>
		<ModalFooter>
			<Button color="primary" on:click={OnCreateTask}>Create</Button>
			<Button color="secondary" on:click={CreateToggle}>Cancel</Button>
		</ModalFooter>
	</Modal>
</div>
