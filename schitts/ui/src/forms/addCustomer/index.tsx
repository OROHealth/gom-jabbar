import {FC} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Alert, Button, Divider, Form, FormGroup, Grid, GridItem, TextInput, Title} from "@patternfly/react-core";
import {Trans, useTranslation} from "react-i18next";
import {ExclamationCircleIcon} from "@patternfly/react-icons";
import {SelectCustomerField} from "components";
import {useMutation, useQueryClient} from "react-query";
import {addCustomer} from "api";

type Params = {
    name: string
    customer_type_id: number|string|undefined
}

const AddCustomerForm:FC = () => {

    const {handleSubmit, control, formState: { isValid }} = useForm<Params>({
        mode: "onChange"
    });

    const {mutateAsync, isLoading, isError, isSuccess} = useMutation(addCustomer);
    const queryClient = useQueryClient();

    const {t} = useTranslation();

    const onSubmit:SubmitHandler<Params> = async (data) => {
        await mutateAsync(data);
        await queryClient.invalidateQueries('getCustomers');
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Title headingLevel={"h1"}>
                <Trans>create_customer</Trans>
            </Title>
            <Divider/>
            <Grid hasGutter>
                <GridItem>
                    <Controller
                        control={control}
                        name="name"
                        defaultValue={""}
                        rules={{ required: true }}
                        render={({
                                     field: { onChange, onBlur, value, name },
                                     fieldState: {error}
                                 }) => (
                            <FormGroup
                                label={t('name')}
                                fieldId={"username"}
                                validated={error ? "error": "default"}
                                helperTextInvalid={error && t('field_required')}
                                helperTextInvalidIcon={<ExclamationCircleIcon/>}
                                autoComplete="off"
                            >
                                <TextInput
                                    required
                                    type="text"
                                    id={"name"}
                                    placeholder={t('name')}
                                    name={name}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    validated={error && 'error'}
                                    value={value}
                                />
                            </FormGroup>
                        )}
                    />
                </GridItem>
                <GridItem>
                    <Controller
                        name="customer_type_id"
                        control={control}
                        defaultValue={undefined}
                        rules={{required: true}}
                        render={({field, fieldState}) => (
                            <SelectCustomerField
                                placeholder={t("select_customer_type")}
                                {...field}
                                {...fieldState}
                            />
                        )}
                    />
                </GridItem>
                {isSuccess &&
                <Alert timeout={5000} variant="success" isInline isPlain title={t("customer_created")}/>}
                {isError &&
                <Alert timeout={5000} variant="danger" isInline isPlain title={t("customer_create_fail")}/>}
                <GridItem lg={4} lgOffset={8}>
                    <Button
                        isDisabled={!isValid}
                        type="submit"
                        isBlock
                        isLoading={isLoading}
                    >
                        <Trans>submit</Trans>
                    </Button>
                </GridItem>
            </Grid>
        </Form>
    )
};

export default AddCustomerForm;
