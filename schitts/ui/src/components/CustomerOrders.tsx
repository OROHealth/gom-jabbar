import {FC, Fragment} from "react";
import {observer} from "mobx-react-lite";
import {useRootStore} from "contexts";
import styled from "styled-components";
import {CustomerOrder} from "components";
import {Divider, List, Title} from "@patternfly/react-core";

interface Props {
    className: any
}

const CustomerOrdersComponent:FC<Props> = observer((props) => {

    const {
        className
    } = props;
    const {userStore} = useRootStore();

    return (
        <Fragment>
            <Title headingLevel={"h1"}>
                Customer recent 10 orders
            </Title>
            <Divider/>
            <List className={className}>
                {userStore.getCustomerOrders.map(order =>
                    <CustomerOrder key={order.id} id={order.id} order={order}/>
                )}
            </List>
        </Fragment>
    )
});

const CustomerOrders = styled(CustomerOrdersComponent)`
  /* CSS styles here. */
  list-style-type: none!important;
`;

export default CustomerOrders;
