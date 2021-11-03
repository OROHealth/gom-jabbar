<script>
    import {useLocation, useNavigate} from 'svelte-navigator';
    import { user, message, btnDisabled, fields, loginInput } from '../stores';
    import { email, required } from '../form/validate';
    import { makeCall } from './utils';
    import Button from '../form/Button';
    import Input from '../form/Input';
    import Password from '../form/Password';

    const location = useLocation();
    const navigate = useNavigate();

    $loginInput = [
		{ id:'emailLogin', type: Input, label: 'Email', validator: [email(), required()] },
        { id:'passwordLogin', type: Password, label: 'Password', validator: [required()] }
    ];

    const handleOnSubmit = e => {
        const param = {
            'email': fields.emailLogin,
            'password': fields.passwordLogin
        };

        makeCall('/api/user/auth', param, (data) => {
            if (data.success) {
                $message = '';
                $user = fields.emailLogin;
                navigate('/', { 
                    state: { from: location.pathname },
                    replace: true
                });
            } else {
                $message = 'The username/password does not match';
            }
        })
    }

    const onClickHandler = (e) => {        
        $fields = {};
        navigate('/register', { 
            state: { from: location.pathname },
            replace: true
        });
    }
</script>

<div class=login-form__container>
    <form class="login-form" on:submit|preventDefault={handleOnSubmit}>
        
        {#each $loginInput as item}
			<svelte:component this={item.type} label={item.label} id={item.id} validator={item.validator}/>
	    {/each}

        <div class="register-form__field">
            <Button text="Login" type="submit" classModifier="" btnDisabled={$btnDisabled} onClickHandler={()=>{}} />
            <Button text="Register" type="button" btnDisabled={false} classModifier="form__button--secondary" onClickHandler={onClickHandler} />
        </div>
        {#if $message}
            <div class="register-form__label--error">
                {$message}
            </div>
        {/if}
    </form>
</div>

<style>
    .login-form {
        align-self: center;
        border-radius: 10px;
        background-color: #fff;
        padding: 20px;
        width: 100%;
    }

    .login-form__container {
        display: flex;
        font-size: 14px;
        height: 100%;
        margin: 0 auto;
        max-width: 480px;
        width: 100%;
    }
</style>