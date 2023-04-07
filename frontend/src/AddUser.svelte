<script>
    import {closeModal} from "./Modal.svelte";
    export let onSubmit;
    let username;
</script>

<h1>Add a new user</h1>
<input type="text" placeholder={'Name...'} bind:value={username} autofocus="autofocus">
<div class="buttonrow">
    <button class="cancel" on:click={closeModal}>Cancel</button>
    <button on:click={onSubmit(username, "default")}>Add</button>
</div>