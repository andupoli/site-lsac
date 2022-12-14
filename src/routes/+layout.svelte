<script>
import { didClickLogin, didClickSignOut, didClickSignUp } from '../mystores.js';
import { page } from '$app/stores';

</script>
<div class:navbar={true}>
    {#if JSON.stringify($page.data.user) == '{}'}
    <button on:click={() => {didClickLogin.set(true)}}>Logare</button>
    <button on:click={() => {didClickSignUp.set(true)}}>Creare cont</button>
    {:else}
    <form class:logform={true} action='?/signout' method="POST">
        <button type="submit">Delogare</button>
    </form>
    {/if}
</div>
<slot></slot>

<style>
    .navbar {
        position: fixed;
        top: 0;
        width: 100%;
        background-color: white;
        height: 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .navbar button {
        border: none !important;
        color: var(--purpl-color);
        background-color: white;
        padding: 10px;
        border-radius: 0px;
        font-size: small;
    }
</style>