<script>
    import { onMount, onDestroy } from 'svelte';
    import { validation } from './validate';
    import { fields, errors } from '../stores';
    export let id;
    export let label;
    export let validator;
    
    const [ validate ] = validation(validator);
</script>

<div class="form__field-container">
    <label class="form__label" for={id}>{label}</label>
    <input 
        name={label}
        class="form__input" 
        id={id} 
        type="text"
        bind:value={fields[id]}
        use:validate={fields[id]}
        class:register-form__input--error={true} />
    {#if errors[id]}
        <label class="form__label--error" for={id}>{errors[id]}</label>
    {/if}
</div>

<style>
    .form__field-container {
        margin-bottom: 20px;
    }

    .form__label {
        font-size: 14px;
        margin-bottom: 10px;
    }

    .form__label--error {
        color: red;
    }

    .form__input {
        border-radius: 5px;
        width: 100%;
    }
</style>