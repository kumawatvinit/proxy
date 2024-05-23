const axios = require('axios');

exports.handler = async function(event, context) {
  const url = event.queryStringParameters.url;
  if (!url) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, token',
        'Access-Control-Allow-Methods': 'GET'
      },
      body: JSON.stringify({ error: 'No URL provided' }),
    };
  }

  const token = event.headers.token;

  try {
    const response = await axios.get(url, {
      headers: {
        token: token,
      },
    });
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, token',
        'Access-Control-Allow-Methods': 'GET'
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, token',
        'Access-Control-Allow-Methods': 'GET'
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
