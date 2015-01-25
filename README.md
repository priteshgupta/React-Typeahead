# React-Typeahead
Quite Possibly the Simplest Typeahead

This is not a fancy library or plugin. This is a super simple (but nicely working) React typeahead. It does support keyboard navigation, carriage selecting, etc. There are no dependencies (other than React, duh), although Bootstrap is recommended for styling (unless you don't mind styling it).

Also I used a function called `customWhere`, which is essentially a faster `Array.prototype.filter()`. You can feel free to replace it with the native `filter()`, I don't think there should be a noticeable performance hit.

Definition of customWhere:

```
var customWhere = function customWhere(arr, t) {
  var results = [];

  for(var i = 0, len = arr.length; i < len; i++) {
    var item = arr[i];

    if (t(item)) {
      results.push(item);
    }
  }

  return results;
};
```

## Styling

The typeahead relies on Bootstrap styling of list groups. It is not required, but recommended. The only other additional style which I added is

```
.typeahead {
  position: absolute;
  z-index: 1; // or more
  width: 200px; // or 300px, etc
}
```

which too is not required, but makes the typeahead display on top of the content (ideal), than pushing the content down.

## Usage

You can load this module as a CommonJS module by doing something like

`var Typeahead = require('./typeahead.jsx');` in your js(x) file and then use it directly as

`<Typeahead id="myTypeahead" array={arrayToFilter} placeholder="My Typeahead" />;`.

Get the value by `document.getElementById('myTypeahead').value` or by passing a `ref` or by passing an object (and update the object in `handleChange()`).