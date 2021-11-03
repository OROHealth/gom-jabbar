<script>
    export let text;
    export let btnDisabled;
    export let classModifier;
    export let type;
    export let onClickHandler;
</script>

<button 
    class="form__button {classModifier}" 
    type="{type}" 
    disabled="{btnDisabled}"
    on:click={onClickHandler}>
        {text}
</button>

<style>
    .form__button {
        background-color: green;
        border: 0;
        border-radius: 5px;
        color: #fff;
        display: block;
        padding: 12px 10px;
        text-align: center;
        width: 100%;
    }

    .form__button:disabled {
        opacity: 0.5;
    }

    .form__button--secondary {
        background-color: transparent;
        border: 1px solid green;
        color: green;
    }
</style>