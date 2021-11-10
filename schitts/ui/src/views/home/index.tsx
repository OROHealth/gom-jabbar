import {Grid, GridItem} from "@patternfly/react-core";
import {observer} from "mobx-react-lite";
import {AddCustomerForm} from "forms";
import {Customers, FilterOutOfTownCustomer, CustomerCount, CustomerOrders} from "components";

const HomeView = observer(() => {

    return (
        <Grid hasGutter>
            <GridItem lg={4}>
                <AddCustomerForm/>
            </GridItem>
            <GridItem lg={4}>
                <FilterOutOfTownCustomer/>
            </GridItem>
            <GridItem lg={4}>
                <CustomerCount/>
            </GridItem>
            <GridItem lg={6}>
                <Customers/>
            </GridItem>
            <GridItem lg={6}>
                <CustomerOrders/>
            </GridItem>
        </Grid>
    );
});

export default HomeView;
