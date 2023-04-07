<script>
    import Modal from "./Modal.svelte";
    import EditUser from "./EditUser.svelte";
    import {openModal, closeModal} from "./Modal.svelte";
	import {api} from "./tools";

    export let profile;
    export let onProfileClick;
    export let onEditProfile;

    let profile_pic = '/profile_pics/'+profile.profile_pic_id+'.jpg';

    // Opens a modal window for editing profile
    function editProfile(profile) {
        openModal(EditUser, {profile:profile, onSubmit:submitEdit});
    }

    // Callback function for the modal editing window, sends an edit user request to db and updates local storage
    async function submitEdit(user) {
        let result = await api('PUT', '/users/'+user.id, {name:user.name, profile_pic_id:user.profile_pic_id});
        onEditProfile(user);
        closeModal();
    }

</script>

{#if profile}
<div class="card profile" on:click={onProfileClick}>
    <img src={profile_pic} class="profile" alt="profile">
    <h2>{profile.name}</h2>
    <img src="edit.png" class="icon small" alt="edit profile" on:click={e => {editProfile(profile)}}>
</div>
{/if}

<Modal />
