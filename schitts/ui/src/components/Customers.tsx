import {FC, Fragment, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {useRootStore} from "contexts";
import styled from "styled-components";
import {Customer} from "components";
import {useQuery} from "react-query";
import {getCustomers} from "api";
import {Divider, List, Pagination, Title} from "@patternfly/react-core";
import {Trans} from "react-i18next";

interface Props {
    className: any
}

const CustomersComponent:FC<Props> = observer((props) => {

    const {userStore} = useRootStore();
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const {data} = useQuery([
        "getCustomers",
        {
            page: page,
            limit: limit
        }], getCustomers);
    const {
        className
    } = props;

    const onSetPage = (_event, pageNumber) => {
        setPage(pageNumber);
    };

    const onPerPageSelect = async (_event, perPage) => {
        setLimit(perPage)
    };

    useEffect(() => {

        userStore.setCustomerCount(data?.count || 0);
        data?.customers.map((customer) => userStore.addCustomer({...customer}));

        return () => {
            userStore.prunedCustomers();
            userStore.toggleFilteringCustomer(false);
        }
        // eslint-disable-next-line
    }, [data]);

    return (
        <Fragment>
            <Title headingLevel={"h1"}>
                <Trans>customers</Trans>
            </Title>
            <Divider/>
            <Pagination
                itemCount={data ?  data?.count: 0}
                page={page}
                onSetPage={onSetPage}
                onPerPageSelect={onPerPageSelect}
                widgetId="pagination-options-menu-top"
            />
            <List className={className}>
                {userStore.isFilteringCustomers ?
                    <Fragment>
                        {userStore.filteredCustomers.map(customer =>
                            <Customer key={customer.id} id={customer.id} username={customer.name}/>
                        )}
                    </Fragment>:
                    <Fragment>
                        {userStore.customers.map(customer =>
                            <Customer key={customer.id} id={customer.id} username={customer.name}/>
                        )}
                    </Fragment>
                }
            </List>
            <Pagination
                itemCount={data ?  data?.count: 0}
                page={page}
                onSetPage={onSetPage}
                onPerPageSelect={onPerPageSelect}
                widgetId="pagination-options-menu-bottom"
            />
        </Fragment>
    )
});

const Customers = styled(CustomersComponent)`
  /* CSS styles here. */
  list-style-type: none!important;
`;

export default Customers;
