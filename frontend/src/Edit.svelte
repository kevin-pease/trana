<script>
    import {closeModal} from "./Modal.svelte";

    export let id = undefined;
    export let name = '';
    export let date = '';
    export let userId;
    export let onSubmit;

    let externalExercises = JSON.parse(localStorage.getItem('externalExercises'));
    let titleCaption;
    let submitCaption;

    if (id) {
        titleCaption = 'Edit exercise';
        submitCaption = 'Save';
    } else {
        titleCaption = 'Add exercise';
        submitCaption = 'Add';
    }
</script>

<h1>{
    titleCaption}
</h1>
<span class="caption">Enter an exercise:</span>
<input type="text" placeholder={'Your exercise...'} bind:value={name} autofocus="autofocus">
{#if externalExercises}
    <span class="caption">Or select a pre-existing one:</span>
    <select name="exercises" bind:value={name} id="exercises">
        {#each externalExercises.results as ex}
            <option  value={ex.name}>{ex.name}</option>
        {/each}
    </select>
{/if}
<input type="date" bind:value={date}>
<div class="buttonrow">
    <button class="cancel" on:click={closeModal}>Cancel</button>
    <button on:click={onSubmit({id:id, userId:userId, name:name, date:date})}>{submitCaption}</button>
</div>