<script>
    import { Router, Link } from "svelte-navigator";
    import { user } from "../stores";

    function handleLogout() {
        $user = null;
    }
</script>

<Router>
    <header>
        <div>
            {#if $user}
                Welcome {$user}
            {/if}
        </div>
        <div class="header_logo-container">
            <img class="header_logo" src="/images/logo.png" alt="" />
        </div>
        <div class="header_btn-container">
            {#if $user}
                <button on:click={handleLogout}>Logout</button>
            {/if}
        </div>
    </header>
</Router>

<style>
    header {
        align-items: center;
        background-color: #f8f8f8;
        display: flex;
        justify-content: space-between;
        min-height: 60px;
        padding: 10px 20px;
        width: 100%;
    }

    header > div {
        flex: 0 0 33.3333%;
    }

    .header_logo {
        display: block;
        height: 50px;
        margin: 0 auto;
        width: auto;
    }

    .header_btn-container {
        text-align: right;
    }
</style>