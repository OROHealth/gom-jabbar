export const makeCall = (url, fields, callback) => {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields),
    })
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}