<script>
    import {closeModal} from "./Modal.svelte";
    export let onSubmit;
    export let profile;

    let name = profile.name;
</script>

<h1>Edit user</h1>
<input type="text" placeholder={'Name...'} bind:value={name} autofocus="autofocus">
<div class="buttonrow">
    <button class="cancel" on:click={closeModal}>Cancel</button>
    <button on:click={e => {profile.name = name; onSubmit(profile)}}>Edit</button>
</div>