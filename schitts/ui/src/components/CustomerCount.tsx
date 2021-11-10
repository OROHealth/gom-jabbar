import {FC, Fragment, InputHTMLAttributes} from "react";
import {Divider, TextInputProps, Title} from "@patternfly/react-core";
import styled from "styled-components";
import {useRootStore} from "contexts";
import {observer} from "mobx-react-lite";
import {Trans} from "react-i18next";

interface Props extends InputHTMLAttributes<TextInputProps>{}

const CustomerCountComponent:FC<Props> = observer(() => {

    const {userStore} = useRootStore();

    return (
        <Fragment>
            <Title headingLevel={"h1"}>
                <Trans>total_customers</Trans>
            </Title>
            <Divider/>
            <Title headingLevel={"h3"}>
                {userStore.customersCount}
            </Title>
        </Fragment>
    )
});

const CustomerCount = styled(CustomerCountComponent)`
`;

export default CustomerCount;
