<script>
    import {useLocation, useNavigate} from 'svelte-navigator';
    import { user } from '../stores';
    import Button from '../form/Button';
    import Input from '../form/Input';
    import Password from '../form/Password';

    const location = useLocation();
    const navigate = useNavigate();

    let message = '';
    let valid = false;
    let fields = {email: '', validateEmail: '', password: ''};
    let errors = {email: '', validateEmail: '', password: ''};
    let dirty = {email: '', validateEmail: '', password: ''};

    const handleOnSubmit = e => {
        if (valid) {
            fetch('/api/user/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fields),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    message = '';

                    $user = json.email;
                    navigate('/', { replace: true });
                } else {
                    message = data.message;
                }
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }

    const onClickHandler = () => {
        navigate('/create', { 
            state: { from: location.pathname },
            replace: true
        });
    }
</script>

<div class=register-form__container>
    <form class="register-form" on:submit|preventDefault={handleOnSubmit}>
        <Input 
            label="Email"
            id="email"
            value={fields.email}
        />

         <Input 
            label="Validate Email"
            id="validate-email"
            value={fields.validateEmail}
        />

        <Password 
            label="Password"
            id="password"
            value={fields.password}
        />

        <div class="register-form__field">
            <Button text="Register" type="submit" classModifier="" btnDisabled={!valid} onClickHandler={()=>{}} />
            <Button text="Back" type="button" classModifier="form__button--secondary" onClickHandler={() => navigate(-1)} />
        </div>
        {#if message}
            <div class="register-form__label--error">
                {message}
            </div>
        {/if}
    </form>
</div>

<style>
    .register-form {
        align-self: center;
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