import {FC, LinkHTMLAttributes} from "react";
import {observer} from "mobx-react-lite";
import styled from "styled-components";
import {useSpring} from '@react-spring/web';
import {List, ListItem, ListVariant} from "@patternfly/react-core";
import {UserAltIcon} from "@patternfly/react-icons";

interface Props extends LinkHTMLAttributes<any>{
    id: string
    order: { [key: string]: any }
}

const CustomerOrderComponent:FC<Props> = observer((props) => {

    const {
        id,
        className,
        order
    } = props;
    const { opacity } = useSpring({
        from: { opacity: 0},
        to: { opacity: 1 }
    });

    return (
        <ListItem
            key={id}
            className={className}
            // @ts-ignore
            style={{opacity}}
        >
            <List variant={ListVariant.inline}>
                <ListItem>
                    {order.menu_item.category === "drink" && <span>🍾</span>}
                    {order.menu_item.category === "food" && <span>🍲</span>}
                    <UserAltIcon/>
                </ListItem>
                <ListItem>
                    {order.menu_item.name}
                </ListItem>
            </List>
        </ListItem>
    )
});

const CustomerOrder = styled(CustomerOrderComponent)`
  padding: 1rem;
  font-weight: bold;
  cursor: pointer;
  border-bottom: 1px solid #d2d2d2;
  
  ul {
    li {
      span {
        margin-right: 30px;
        padding: 0 8px;
        border-right: 1px solid #555;
      }
    }
  }
`;

export default CustomerOrder;
