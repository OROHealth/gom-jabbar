<script>
    import { useLocation, useNavigate } from 'svelte-navigator';
    import { message, btnDisabled, fields, registerInput } from '../stores';
    import { email, required } from '../form/validate';
    import Button from '../form/Button';
    import Input from '../form/Input';
    import Password from '../form/Password';
    import { makeCall } from './utils';

    const location = useLocation();
    const navigate = useNavigate();

    $registerInput = [
		{ id:'email', type: Input, label: 'Email', validator: [email(), required()] },
        { id:'validate-email', type: Input, label: 'Validate Email', validator: [email(), required()] },
        { id:'password', type: Password, label: 'Password', validator: [required()] }
    ];

    const handleOnSubmit = e => {
        if (!valid) {
            delete fields['validate-email'];

            makeCall('/api/user/create', fields, (data) => {
                if (data.success) {
                    $message = '';
                    navigate('/login', { replace: true });
                } else {
                    $message = 'Something went wrong';
                }
            })
        }
    }

    const onClickHandler = () => {
        navigate('/login', { 
            state: { from: location.pathname },
            replace: true
        });
    }
</script>

<div class=register-form__container>
    <form class="register-form" on:submit|preventDefault={handleOnSubmit}>
        {#each $registerInput as item}
			<svelte:component this={item.type} label={item.label} id={item.id} validator={item.validator}/>
	    {/each}
        
        <div class="register-form__field">
            <Button text="Register" type="submit" classModifier="" btnDisabled={$btnDisabled} onClickHandler={()=>{}} />
            <Button text="Back" type="button" classModifier="form__button--secondary" btnDisabled={false} onClickHandler={onClickHandler} />
        </div>
        {#if $message}
            <div class="register-form__label--error">
                {$message}
            </div>
        {/if}
    </form>
</div>

<style>
    .register-form {
        align-self: center;
        background-color: #fff;
        border-radius: 10px;
        padding: 20px;
        width: 100%;
    }

    .register-form__container {
        display: flex;
        font-size: 14px;
        height: 100%;
        margin: 0 auto;
        max-width: 480px;
        width: 100%;
    }
</style>