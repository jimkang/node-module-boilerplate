yet-another-module
==================

cool-description-goes-here

Installation
------------

First, install Node. Then:

    npm install
    npm install wzrd -g

Create a `config.js` file that looks like this:

    module.exports = {
      github: {
        clientId: 'github client id',
        codeExchangeURL: 'your code exchange URL',
        appName: 'yourgithubappname'
      }
    };

`codeExchangeURL` refers to a service that will exchange a GitHub auth code (passed when the auth redirects you back) for an access token for you. e.g. http://myserver.com/exchange, at which you have running an instance of [github-token-exchanger](https://github.com/jimkang/github-token-exchanger).

If you're using github-token-exchanger, `appName` is the name that github-token-exchanger knows your app by so that it can look up its client id and secret.

Usage
-----

    make run-on-80

Then, wzrd will say something like:

    wzrd index.js
    server started at http://localhost:80

You can open your browser to localhost. It should immediately redirect you to GitHub to log you in. After you log in, it will redirect you back to whatever redirect URL you set in your [GitHub OAuth Apps settings](https://github.com/settings/developers). During development, you should put `http://localhost` in the Authorization Callback URL field and put the clientId for the app in your `config.js`.

You can then add code starting in app.js. This won't compile down to ES 5 – expects clients to support ES 6. You can check out an earlier commit of this repo - d227984628e258a2cf82fa14926b0e452fe4f5f9 or earlier - if you want support for that.

Run `make prettier` (expects you to have run `npm install -g prettier`) and `eslint .` before committing.

License
-------

The MIT License (MIT)

Copyright (c) 2017 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
