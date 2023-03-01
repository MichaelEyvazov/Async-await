function getUsers() {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            return data;
        });
}
function createUser(userData) {
    return fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

function updateUser(userId, updatedData) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

async function executeRequestsInOrder() {
    const requests = [getUsers(), createUser({ name: "John Doe" }), updateUser(1, { name: "Jane Doe" })];
    for (const request of requests) {
        const response = await request;
        console.log(response);
    }
}