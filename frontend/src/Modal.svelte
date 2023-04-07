<!-- 
    The component allows you to easily create modal dialogs (popups). The component itself
    should be included directly in the <body> of the page, just once. 
    Code that want to show a modal should use the static `openModal` method to actually
    show the modal, and to tell it what Component to draw inside.

    Copyright © Frank van Viegen (denk ik?)
-->

<script context="module">
    // Note the `context="module"`, meaning this script runs only once for this component,
    // instead of for each instance. The functions we create will be static.
    import { writable } from 'svelte/store';

    // We'll use a global store to contain the details for the one modal that can be open at
    // any time. It either contains `undefined` (there's currently no modal) or an objects 
    // containing a `component` (the class for a component that will be used to render the
    // inside of the modal) and `props` (the properties to pass to that component).
    const store = writable();

    export function openModal(component, props={}) {
        store.set({component, props});
    }

    export function closeModal() {
        store.set();
    }
</script>

{#if $store}
    <!-- The modal window to create a new list item: -->
    <div class="modalBg" on:click|self={closeModal}>
        <div class="modal">
            <svelte:component this={$store.component} {...$store.props} />
        </div>
    </div>
{/if}
