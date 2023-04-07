<script>
    import {openModal, closeModal} from "./Modal.svelte";
    import {api} from "./tools";
    import Edit from "./Edit.svelte";

    export let exerciseData;
    export let month;
    export let onDelete;
    export let onAddExercise;
    export let onEditExercise = null;

    let userId = localStorage.getItem("userId");
    let currentDate = "";

    // Helper function for sharing an exercise via the Web Share Api
	function shareExercise(exercise) {
        console.log("Sharing...")
		if (navigator.share) {
		navigator.share(exercise)
          .then(() =>
            console.log('Shared successfully')
          )
          .catch((e) =>
            console.log('Error: ' + e)
          )
		}
	}
    
    // Toggles the visibility of the exercise info per day
    function toggleExpandedView() {
        expandedView = !expandedView;
    }

    // Deletes an exercise from local storage and database
    async function deleteExercise(id) {
        onDelete(id);
        await api("DELETE", "/exercises/"+id);
    }
    
    // Opens modal window for adding exercise
    function addExercise(date) {
        openModal(Edit, {userId:userId, date:date, onSubmit:onAddExercise});
    }
    
    // Opens modal window for editing exercise
    function editExercise(id, name, date) {
        openModal(Edit, {id:id, userId:userId, name:name, date:date, onSubmit:submitEdit});
    }

    // Callback function for the modal editing window, adds an exercise to the database and local storage
    async function submitEdit(exercise) {
        let result = await api('PUT', '/exercises/'+exercise.id, {userId:userId, name:exercise.name, date: exercise.date});
        onEditExercise(exercise);
        closeModal();
    }
    
    // Reactive variables for dynamic DOM updates
    $: expandedView = (month > 0) ? false : true;
    $: len = exerciseData.length;
    $: text = (len > 1) ? "exercises" : "exercise";
    $: {
        if (exerciseData) {
        currentDate = exerciseData[0].date;
        }    
    }
</script>

{#if exerciseData}
    <div class="card day" on:click={toggleExpandedView}>
        <h2 class="padding">{currentDate}</h2>
        <span class="count">
            ({len} {text})
        </span>
    </div>
    {#if expandedView == true}
        {#if exerciseData}
            <div class="ex-container">
                {#each exerciseData as exercise}
                    <div class="exercise">
                        <span class="exercise">{exercise.name}</span>
                        <img src="share.png" class="icon small padding" alt="share" on:click={e => {shareExercise(exercise)}}>
                        <img src="edit.png" data-cy="ex-edit" class="icon small padding" alt="edit" on:click={e => {editExercise(exercise.id, exercise.name, exercise.date)}}>
                        <img src="delete.png" data-cy="ex-del" class="icon small" alt="delete" on:click={e => {deleteExercise(exercise.id)}}>
                    </div>
                {/each}
                <img src="add.png" class="add small" alt="add" on:click={async e => {addExercise(currentDate)}}>
            </div>
        {/if}
    
    {/if}
{/if}