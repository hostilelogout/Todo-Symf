<script>
	import { TaskDelete, TaskUpdate, Tasks } from '$lib/TaskList';
  import { NewTask } from '$lib/TaskList';
  import EditTask, {EditToggle} from './EditTask.svelte';

  let activeTasks = Tasks;
  
  NewTask.subscribe((newTask) => {
    if (newTask.length > 0){
      activeTasks = newTask;
    }
    
  });
  TaskUpdate.subscribe((update => {
    if (update.length > 0){
      activeTasks = update;
    }
  }))

  TaskDelete.subscribe((onDelete => {
    activeTasks = onDelete;
  }))

</script>

<div class="b-example-divider b-example-vr"></div>
  <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary" style="width: 380px;">
    <a href="/" class="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom">
      <svg class="bi pe-none me-2" width="30" height="24"><use xlink:href="#bootstrap"/></svg>
      <span class="fs-5 fw-semibold">Inactive Tasks</span>
    </a>
    <div class="list-group list-group-flush border-bottom scrollarea">
      {#each activeTasks as {taskid,title,description,day},i}
        {#if !activeTasks.at(i)?.active}
      <button class="list-group-item list-group-item-action py-3 lh-sm" on:click={() => EditToggle(taskid)} id={taskid.toString()}>
        <div class="d-flex w-100 align-items-center justify-content-between">
          <strong class="mb-1">{title}</strong>
          <small class="text-body-secondary">{day}</small>
        </div>
        <div class="col-10 mb-1 small">{description}</div>
      </button>  
        {/if}
      {/each}
    </div>
  </div>
  <div class="b-example-divider b-example-vr"></div>

  <EditTask></EditTask>