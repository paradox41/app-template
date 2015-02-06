# app template

[![License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/paradox41/app-template)

Boilerplate for my Angular apps

## Project Structure

```
├── app/
│   ├── assets/
│   │   ├── stylesheets/
│   │   ├── img/
│   │   │   ├── png
│   │   │   ├── svg
|   |   |   |
│   ├── bower_components/
│   ├── common/
│   |   ├── directives.js
│   |   ├── filter.js
│   |   ├── services.js
│   ├── module-foo/
|   │   ├── submodule-baz/
|   |   |   |── _submodule-baz.html
|   |   |   |── _submodule-baz.scss
|   |   |   |── submodule-baz.js
|   |   |── module-foo.js
|   |   |── _module-foo.html
|   |   |── _module-foo.scss
|   |   |── directives.js
|   |   |── services.js
│   ├── module-bar/
|   |   |── _module-bar.html
|   |   |── _module-bar.scss
|   |   |── module-bar.js
|   |── app.js
|   |── app.scss
|   |── config.js
│   |── index.html
.bowerrc
.editorconfig
.gitignore
.jsbeautifyrc
.jshintrc
bower.json
gulpfile.js
LICENSE
package.json
README.md
```

### General
- The project utilizes a fractal pattern

### JavaScript
- Each module should be totally self-contained. Any functionality shared across modules should be moved into `common/`.
- Modules can have their own directives, services, filters, etc. If multiple files are needed in order to maintain file size,
a folder should be created (`directives/`, `services/`, etc) and the broken up files should be placed into their respective folders
with less abstract naming conventions.
- JavaScript files should always be as close as possible - preferably on the same level - as their HTML partials.
- If a directive has a partial - which they tend to - a new folder should be created that is named accordingly (meaning not something generic)
and the HTML partial and the JavaScript file should be placed together in that folder.

### Sass
- `app.scss` is merely a table of contents. There should be no Sass in the file.
- Each module is responsible for exporting its submodules. In other words, `app.scss` should only import top level modules.
- Sass that needs to be shared among modules should be moved into `assets/stylesheets/`.

### Modules

A typical module will look something like this:

```javascript
import * as _ from 'lodash';

class Example {
    constructor(data) {
        this.exampleData = data;
    }

    someMethod() {
        return _.map(this.exampleData, function(data) {
            return (data * 2);
        });
    }

    get data() {
        return this.exampleData;
    }
}

function ExampleState($stateProvider) {
    $stateProvider.state('app.example', {
        controller: ['data', Example],
        controllerAs: 'Example',
        url: '/example',
        templateUrl: require('./_example.html')
    });
}

export default ['$stateProvider', ExampleState];
```

### Commit Conventions

Follow [conventional changelog](https://github.com/ajoslin/conventional-changelog/blob/master/CONVENTIONS.md)
