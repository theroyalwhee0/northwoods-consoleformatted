# Northwoods-ConsoleFormatted: A Formatted Console Stream for Northwoods.

# Installation
npm --save install @theroyalwhee0/northwoods-consoleformatted

# Usage
```
Northwoods.setDefaultStreamType(require('northwoods-consoleformatted'));
var log = new Northwoods.Logger({ name: 'flapjacks' });
log.info({ maple: true, butter: true }, 'Here comes the syrup.');
```

# Testing
- npm test
- npm run test-watch

# History
- v0.0.4 Initial release. Moved from main Northwoods project.

# Legal & License
Copyright 2017 Adam Mill

The library is released under Apache 2 license.  See LICENSE for more details.
