<script lang="ts">

    import { page } from '$app/stores'
    import { didClickLogin, didClickSignOut, didClickSignUp } from '../mystores.js';
    let log = false
    let sup = false
    $: isLoggedin = JSON.stringify(data.user) != '{}'
    $: username = isLoggedin ? JSON.parse(data.user['user'])['username'] : ""
    export let data;

</script>

<main>
    {#if $didClickLogin === true}
    <div class:allwin={true}>
    <form class:logform={true} action='?/login' method="POST">
        <div>
            <label for="username">Name</label>
            <input type="text" id="username" name="username" required>
        </div>
        <div>
            <label for="password">Password</label>
            <input type="text" id="password" name="password" required>
        </div>
        <button type="submit">DONE</button>
        <button on:click={() => {didClickLogin.set(false)}}>Inchide</button>
    </form>
    </div>
    {/if}

    {#if $didClickSignUp === true}
    <div class:allwin={true}>
        <form class:logform={true} action='?/signup' method="POST">
            <div>
                <label for="username">Name</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div>
                <label for="password">Password</label>
                <input type="text" id="password" name="password" required>
            </div>
            <button type="submit">SIGNUP</button>
            <button on:click={() => {didClickSignUp.set(false)}}>Inchide</button>
        </form>
    </div>
    {/if}

    <div class:restofpage={true}>
        <div class:dr1all={true}>
            <div class:dr1={true}>
                {#if username === ""}
                <h1>Bine v-am gasit la meme it!</h1>
                {:else}
                <h1>Salut, {username}</h1>
                {/if}
                <h2>Platforma ideala pentru studentii la politehnica amuzati de cate materii o sa pice anul asta!</h2>

            </div>
            <div class:im={true}>
                <div class:dr1im={true}>
                </div>
            </div>
        </div>

        <div class:dr2all={true}>
            <div class:dr2form={true}>
                <div class:dr3all={true}>
                    <div>
                    <h1>Ai tupeu si crezi ca esti amuzant?</h1>
                    
                    <h2>Trimite aici un meme neboon</h2>
                    </div>

                    {#if isLoggedin}
                    <form class:logform={true} action='?/meme' method="POST" enctype="multipart/form-data">
                        <div>
                            <label for="descriere">Descriere</label>
                            <input type="text" id="descriere" name="descriere" required>
                        </div>

                        <div>
                            <label for="meme">Meme ul tau</label>
                            <input type="file" id="meme" name="meme" required>
                        </div>
                        
                        <button type="submit">Submit</button>
                    </form>
                    {:else}
                        <div style="display: flex; flex-direction: row; justify-content:center; align-items:center">
                            <button on:click={() => {didClickLogin.set(true)}}>Log in to post!</button>
                        </div>
                    {/if}

                </div>
            </div>
        </div>
        
    </div>
    <h1>Memeuri. Toate memeurile uploadate se vor putea vedea aici!</h1>
    <div class:dr3-all={true}>
        
        {#each data.memes as meme} 
            <div class:img-card={true}>
                <h1 style:padding=0>{meme.username}</h1>
                <h2 style:padding="0 !important" >{meme.description}</h2>
                <div>
                    <img src={`${meme.filebloburl}`} style="width: 200px; height: 200px"/>
                </div>
            </div>
        {/each}
    </div>


</main>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');
    .img-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgb(228, 204, 255);
        margin: 10px;
        border-radius: 10px;
        padding: 5px;
        
    }

    .dr3-all {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        background-color: azure;
    }
    :global(*) {
        font-family: 'Josefin Sans', sans-serif;
    }
    .dr3all {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: space-around;
        width: 70vw;
        margin: 70px;
        background-color: white;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
    }
    .dr2all {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--purpl-color);
        margin-top: 30px;

    }

    .dr1 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .dr1im {
        width: 300px;
        height: 300px;
        background: url('https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fdustoffthebible.com%2Fwp-content%2Fuploads%2F2017%2F07%2FJesus-been-hittin-the-gym-990x1024.jpg&f=1&nofb=1&ipt=30a1be1b1c2c278b27b158a49da3eb865b02552def65d1f4576932d330f533be&ipo=images');
        background-repeat: no-repeat;
        background-size: cover;
    }

    .dr1all {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }

   :global(body) {
        margin: 0;
        --purpl-color: rgb(74, 0, 158);
    }
    
    h1 {
        color: var(--purpl-color);
        text-align: center;
    }

    h2 {
        color: var(--purpl-color);
        font-weight: 100;
        text-align: center;
    }
    .restofpage {
        padding-top: 50px;
    }
    .allwin {

        position: fixed;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: var(--purpl-color);
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;

    }
    .logform {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: white;
        border-radius: 10px;
        padding: 20px;

    }

    :global(input) {
        display: block;
        border: 1px solid var(--purpl-color) !important;
        border-radius: 10px;
        padding: 10px;
        color:var(--purpl-color);
    }

    :global(input::placeholder) {
        color: rgb(186, 186, 186)
    }

    .logform label {
        display: block;
        color: var(--purpl-color);
    }

    :global(button) {
        border: none !important;
        color: white;
        background-color: var(--purpl-color);
        padding: 10px;
        border-radius: 10px;

    }
</style>

