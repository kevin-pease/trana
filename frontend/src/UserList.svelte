<script>
    import UserProfile from "./UserProfile.svelte";
    export let users;
    export let onSelectProfile;
    export let onEditProfile;

    // Callback function to 'bubble up' selected profile
    function selectProfile(id, username) {
        onSelectProfile(id, username);
    }

    // Callback function to 'bubble' up changed user profile
    function editProfile(profile) {
        onEditProfile(profile);
    }
</script>

{#if users}
    {#each users as user}
        <UserProfile profile={user} onEditProfile={editProfile} onProfileClick={e => {selectProfile(user.id, user.name)}}/>
    {/each}
{/if}