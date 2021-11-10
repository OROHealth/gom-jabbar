export const getCustomerReactions = async ({ queryKey }) => {

    const [_key] = queryKey;

    const options:any = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
        },
        key: _key
    };

    const response = await fetch(`${process.env.REACT_APP_BASE_API}/customers/reactions`, options);
    const result = await response.json();

    if (!response.ok) throw new Error(result.message)

    return result
};

export const getCustomerTypes = async ({ queryKey }) => {

    const [_key] = queryKey;

    const options:any = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
        },
        key: _key
    };

    const response = await fetch(`${process.env.REACT_APP_BASE_API}/customers/types`, options);
    const result = await response.json();

    if (!response.ok) throw new Error(result.message)

    return result
};

export const addCustomer = async ( data ) => {

    const options:any = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
            "name": data.name.toLowerCase(),
            "customer_type_id": Number(data.customer_type_id)
        })
    };

    const response = await fetch(`${process.env.REACT_APP_BASE_API}/customers`, options);
    const result = await response.json();

    if (!response.ok) throw new Error(result.message)

    return result
};

export const getCustomers = async ({ queryKey }) => {

    const [_key, {page, limit}] = queryKey;

    const options:any = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
        },
        key: _key
    };

    const response = await fetch(`${process.env.REACT_APP_BASE_API}/customers?limit=${limit}&page=${page}`, options);
    const result = await response.json();

    if (!response.ok) throw new Error(result.message)

    return result
};

export const searchOutOfTownCustomers = async (data) => {

    const options:any = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
            "name": data.name.toLowerCase()
        })
    };

    const response = await fetch(`${process.env.REACT_APP_BASE_API}/customers/search/out-of-town`, options);
    const result = await response.json();

    if (!response.ok) throw new Error(result.message)

    return result
};

export const getCustomerOrders = async (data) => {

    const {customer_id, page, limit} = data;

    const options:any = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
        }
    };

    const response = await fetch(`${process.env.REACT_APP_BASE_API}/customers/${customer_id}/orders?limit=${limit||10}&page=${page||1}`, options);
    const result = await response.json();

    if (!response.ok) throw new Error(result.message)

    return result
};
