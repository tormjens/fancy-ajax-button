# Fancy Ajax Button

A button I use in my home automation interface.

It sends a request to a given URL, displays a loading animation while in progress and sets an active class if it was not set before.

It has no dependencies and is written in CoffeeScript (compiled to JavaScript)

## Use

It accepts 3 parameters.

* Selector
* URL
* Is active?

### In the browser
It is availiable via the `window` object as `SubmitButton`
```
new SubmitButton('#my-button', 'http://example.com', true)
```

### Node/CommonJS
```
var SubmitButton = require('fancy-ajax-button');
new SubmitButton('#my-button', 'http://example.com', true)
```
