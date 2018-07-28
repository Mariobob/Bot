const fetch = require('node-fetch');
const FormData = require('form-data');
const querystring = require('querystring');
const { METHODS: Methods } = require('http');

class Request {
  constructor(options) {
    if (!options.url) throw new SyntaxError("[RequestHandler] 'url' paramater is required.");
    this.url = options.url;
    this.method = options.method ? options.method.toUpperCase() : "GET";
    if (!Methods.includes(this.method)) throw new SyntaxError(`[RequestHandler] Method "${this.method}" is not supported.`);
    this.query = options.query || {};
    this.headers = options.headers || {};
    this.body = options.body || {};
    this.redirects = typeof options.redirects !== 'undefined' ? options.redirects : 20;
  }

  async _request() {
    const queryParams = querystring.stringify(this.query);
    const response = await fetch(`${this.url}${queryParams ? `?${queryParams}` : ''}`, {
      method: this.method,
      headers: this.headers,
      follow: this.redirects,
      body: this.body
    });
    const raw = await response.buffer();
    const headers = {};
    for (const [header, value] of response.headers.entries()) headers[header] = value;
    const res = {
      status: response.status,
      statusText: response.statusText,
      headers,
      url: response.url,
      ok: response.ok,
      raw,
      get text() {
        return raw.toString();
      },
      get body() {
        if (/application\/json/gi.test(headers['content-type'])) {
          try {
            return JSON.parse(raw.toString());
          } catch(err) {
            return raw.toString();
          }
        } else {
          return raw.toString();
        }
      }
    };
    if (!response.ok) {
      const err = new Error(`${res.status} — ${res.statusText}`);
      Object.assign(err, res);
      throw err;
    }

    return res;
  }

  then(resolve, reject) {
    return this._request().then(resolve).catch(reject);
  }

  catch(reject) {
    return this.then(null, reject);
  }

  end(cb) {
    return this.then(
      response => cb ? cb(null, response) : response,
      err => cb ? cb(err, err.status ? err : null) : err
    );
  }

  query(name, value) {
    if (typeof name === 'object' && !value) {
      for (const [param, val] of Object.entries(name)) this.query[param] = val;
    } else if (typeof name === 'string' && value) {
      this.query[name] = value;
    } else {
      throw new SyntaxError("'query' must be an object with a value or a string.");
    }

    return this;
  }

  set(header, val) {
		if (typeof header === 'object' && !value) {
			for (const [header, value] of Object.entries(header)) this.headers[header] = value;
		} else if (typeof header === 'string' && value) {
			this.headers[header] = val;
		} else {
			throw new TypeError('The "headers" parameter must be either an object or a header field.');
		}

    return this;
  }

  attach(...args) {
		if (!this.body || !(this.body instanceof FormData)) this.body = new FormData();
		if (typeof args[0] === 'object') {
			for (const [key, val] of Object.entries(args[0])) this.attach(key, val);
		} else {
			this.body.append(...args);
		}

    return this;
  }

  send(body, raw = false) {
		if (body instanceof FormData) raw = true;
		if (!raw && body !== null && typeof body === 'object') {
			const header = this.headers['content-type'];
			if (header) {
				if (/application\/json/gi.test(header)) body = JSON.stringify(body);
			} else {
				this.set('content-type', 'application/json');
				body = JSON.stringify(body);
			}
		}

    return this;
  }

  redirects(val) {
		if (typeof amount !== 'number') throw new TypeError('The "amount" parameter must be a number.');
		this.redirectCount = amount;

    return this;
  }
};

for (const method of Methods) {
  if (!/^[A-Z$_]+$/gi.test(method)) continue;
  Request[method.toLowerCase()] = (url, options) => new Request({
    url, method, ...options
  });
}

module.exports = Request;