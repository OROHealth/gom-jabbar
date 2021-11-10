import {action, computed, makeObservable, observable} from "mobx"

export default class UserStore {

    constructor() {
        makeObservable(this, {
            data: observable,
            customers: observable,
            customerTotal: observable,
            customerOrders: observable,
            filteredCustomers: observable,
            isFilteringCustomers: observable,
            setData: action,
            addCustomer: action,
            prunedCustomers: action,
            prunedCustomerOrders: action,
            toggleFilteringCustomer: action,
            setCustomerCount: action,
            customersCount: computed,
            getCustomerOrders: computed
        })
    }

    data: { [key: string]: any } = {};
    customers: { [key: string]: any }|undefined[] = [];
    filteredCustomers: { [key: string]: any }|undefined[] = [];
    isFilteringCustomers: boolean = false;
    customerTotal: number = 0;
    customerOrders: { [key: string]: any }|undefined[] = [];

    setData = (option: { [key: string]: any }) => {
        const keys = Object.keys(option);
        keys.map(key => this.data[key] = option[key]);
    }

    addCustomer = (customer: { [key: string]: any } )  => {
        this.prunedCustomerOrders();
        const userCustomer = this.customers.filter(data => data.name.toLowerCase() === customer.name.toLowerCase());
        userCustomer.length < 1 && this.customers.push(customer);
        this.customers.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    }

    toggleFilteringCustomer = (filtering: boolean) => {
        this.isFilteringCustomers = filtering;
    }

    prunedCustomers = () => {
        this.customers = [];
    }

    prunedCustomerOrders = () => {
        this.customerOrders = [];
    }

    setCustomerCount (total: number) {
        this.customerTotal = total;
    }

    addCustomerOrders = (order: { [key: string]: any } ) => {
        this.prunedCustomerOrders();
        this.customerOrders.push(order);
        this.customers.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    }

    get customersCount() {
        return this.customerTotal;
    }

    get getCustomerOrders() {
        return this.customerOrders;
    }

}
