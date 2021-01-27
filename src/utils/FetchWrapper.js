export default class ClientJS {
  constructor() {
    this.baseUrl = 'https://jsonplaceholder.typicode.com'
    // /posts
  }

  GET(endpoint) {
    return this.handleResolver(endpoint, 'GET')
  }

  async handleResolver(endPoint, httpVerb, payload) {
    let header = {
      method: httpVerb,
      body: JSON.stringify(payload),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    };

    const response = await fetch(
      this.baseUrl + endPoint, header
    );

    if (response.status === 401) {
      window.location.assign(window.location);
      return;
    }

    const data = response.status != 204 ? await response.json() : await response;

    if (response.ok) {
      return data;
    }
  }
}