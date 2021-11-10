import {FC, Fragment, InputHTMLAttributes, useEffect} from "react";
import {Divider, TextInput, TextInputProps, Title} from "@patternfly/react-core";
import styled from "styled-components";
import {useRootStore} from "contexts";
import {observer} from "mobx-react-lite";
import {Trans, useTranslation} from "react-i18next";
import {useMutation} from "react-query";
import {searchOutOfTownCustomers} from "api";

interface Props extends InputHTMLAttributes<TextInputProps>{}

const FilterCustomerComponent:FC<Props> = observer((props) => {

    const {
        className
    } = props;

    const {userStore} = useRootStore();
    const {t} = useTranslation();
    const { mutateAsync, data } = useMutation(searchOutOfTownCustomers);

    const search = async (data) => {
        userStore.prunedCustomers();
        await mutateAsync(data)
        userStore.toggleFilteringCustomer(true);
    }

    useEffect(() => {
        userStore.setCustomerCount(data?.count || 0);
        data?.customers.map((customer) => userStore.addCustomer({...customer}));

        return () => {
            userStore.toggleFilteringCustomer(false);
        }
        // eslint-disable-next-line
    }, [data]);

    return (
        <Fragment>
            <Title headingLevel={"h1"}>
                <Trans>search_out_of_town_customers</Trans>
            </Title>
            <Divider/>
            <TextInput
                className={className}
                placeholder={t("search_out_of_town_customers")}
                required
                aria-label="search customer"
                label="Search for customer."
                onChange={(value) => search({name: value})}
            />
        </Fragment>
    )
});

const FilterOutOfTownCustomer = styled(FilterCustomerComponent)`
`;

export default FilterOutOfTownCustomer;
