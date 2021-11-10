import {FC, LinkHTMLAttributes, useEffect} from "react";
import {observer} from "mobx-react-lite";
import styled from "styled-components";
import {useSpring} from '@react-spring/web';
import {List, ListItem, ListVariant} from "@patternfly/react-core";
import {UserAltIcon} from "@patternfly/react-icons";
import {useMutation} from "react-query";
import {getCustomerOrders} from "api";
import {useRootStore} from "../contexts";

interface Props extends LinkHTMLAttributes<any>{
    id: string
    username: string
}

const CustomerComponent:FC<Props> = observer((props) => {

    const {
        id,
        className,
        username
    } = props;
    const { opacity } = useSpring({
        from: { opacity: 0},
        to: { opacity: 1 }
    });
    const { mutateAsync, data} = useMutation(getCustomerOrders);
    const {userStore} = useRootStore();

    const getOrders = async (data) => {
        await mutateAsync(data)
    };

    useEffect(() => {

        data?.orders.map((order) => userStore.addCustomerOrders({...order}));

        return () => {
            userStore.prunedCustomerOrders();
        }
        // eslint-disable-next-line
    }, [data]);

    return (
        <ListItem
            key={id}
            className={className}
            // @ts-ignore
            style={{opacity}}
        >
            <List
                variant={ListVariant.inline}
                onClick={() => getOrders({
                    customer_id: id
                })}
            >
                <ListItem>
                    <UserAltIcon/>
                </ListItem>
                <ListItem>
                    {username}
                </ListItem>
            </List>
        </ListItem>
    )
});

const Customer = styled(CustomerComponent)`
  padding: 1rem;
  font-weight: bold;
  cursor: pointer;
  border-bottom: 1px solid #d2d2d2;
  &:active {
    background-color: #d2d2d2;
    font-weight: bold;
  }
`;

export default Customer;
