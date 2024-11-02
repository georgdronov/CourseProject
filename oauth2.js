import fetch from 'node-fetch';

const url = 'https://cweb2-dev-ed.develop.my.salesforce.com/services/oauth2/token';

const params = new URLSearchParams();
params.append('grant_type', 'authorization_code');
params.append('code', 'aPrxp.7fR25AS7OP3xfWa5WUl71DaRwGpqYUNN0DxW6S0ww7Gt1mrPboMDizOeHwLVR5yutymg');
params.append('client_id', '3MVG9GCMQoQ6rpzTb7oeYSvySRytu1xXT_GCeSV_GScWAPSjc0BXfZp7qUrEPpYZWZkSHK.5rhrapF7Kpi7OF');
params.append('client_secret', '4AB8B6A7B0A0426B16CBDFE04A014B687652EA77C992F375EC118033A42DC6BF'); // Замените на ваш client secret
params.append('redirect_uri', 'https://login.salesforce.com/services/oauth2/success');

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
})
.then(response => {
    console.log('Response:', response);
    return response.json().then(data => ({ data, status: response.status }));
})
.then(({ data, status }) => {
    console.log('Status:', status);
    console.log('Response Data:', data);
    if (status === 200) {
        console.log('Access Token:', data.access_token);
        console.log('Refresh Token:', data.refresh_token);
    } else {
        console.error('Error:', data.error, data.error_description);
    }
})
.catch(error => console.error('Fetch Error:', error));

