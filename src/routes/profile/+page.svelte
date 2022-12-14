<script>
	import { onMount } from "svelte";
    import { page } from "$app/stores";
</script>

<main>
    <div>
        <h1>User profile</h1>
        {JSON.stringify($page.data)}
    </div>  
</main>