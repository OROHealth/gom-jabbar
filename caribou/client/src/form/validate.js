import { fields, errors, dirty, btnDisabled } from '../stores';

export const email = (value) => {
    return function emailValidation(value) {
        return (value && !!value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) || 'Please enter a valid email'
    }
}

export const required = (value) => {
    return function requiredValidation(value) {
        return (value !== undefined && value !== null && value !== '') || 'This field is required'
    }
}

const buildValidator = (validators) => {
    return function validate(value, changed) {
        if (!validators || validators.length === 0) {
            return { changed }
        }

        const failing = validators.find(v => v(value) !== true)

        return {
            changed,
            valid: !failing,
            message: failing && failing(value)
        }
    }
}

export const validation = (validators) => {
    const validator = buildValidator(validators);

    function action(node, binding) {
        const id = node.id;

        function validate(value, changed) {
            let result = validator(value, changed);
            let flag = false;

            dirty[id] = result.changed;
            errors[id] = result.message;

            for (const [key, val] of Object.entries(errors)) {
                if (typeof val !== 'function') {
                    if (val) {
                        flag = true;
                    }
                }
            }

            btnDisabled.set(flag);
        }

        validate(binding, false)

        return {
            destroy() {
                const id = node.id;
                delete dirty[id];
                delete errors[id];
                delete fields[id];
            },
            update(value) {
                validate(value, true)
            }
        }
    }

    return [action]
}