<div align="center">

### Slack Bolt JS DSL

![GitHub License](https://img.shields.io/github/license/bnjns/slack-bolt-js-dsl?style=flat-square)
![NPM Version](https://img.shields.io/npm/v/%40bnjns%2Fslack-bolt-js-dsl?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/bnjns/slack-bolt-js-dsl?style=flat-square)

---

A DSL-like package that allows you to fluently build blocks to use with Slack's Bolt JS SDK.
</div>

## 🧐 About

Slack's Bolt SDK can be used to interact with a Slack workspace, and sending messages or building views uses their Block
Kit. To build blocks, elements, inputs and views you just create a raw Javascript object, however coming from other
languages this does not provide the most user-friendly experience, especially if you enforce camel-casing via ESLint.

This package uses the builder pattern to allow you to build blocks and views in a more fluent manner:

```typescript
import { KnownBlock } from '@slack/bolt'
import { blocks } from '@bnjns/slack-bolt-dsl'
import { mrkdwnText } from '@bnjns/slack-bolt-dsl/elements'
import { Button } from '@bnjns/slack-bolt-dsl/inputs'

const blocks: KnownBlock[] = blocks(blocks =>
  blocks
    .header(header => header.text('This is the header'))
    .divider()
    .section(section =>
      section
        .text(mrkdwnText('Some *markdown* text'))
        .accessory(Button, button => 
          button
            .text('Ok')
            .value('confirmed')
            .style('primary')
        )
    )
)
```

## 🎈 Usage

TODO.

## 🏁 Contributing

### Prerequisites

- Node.js (18.x or later)
- Yarn 1.x

### Installing

Simply clone this repo to your desired location:

```sh
git clone git@github.com:bnjns/slack-bolt-js-dsl.git
```

Install the dependencies:

```sh
yarn install
```

### Running the tests

To run the unit tests:

```sh
yarn test
```

Alternatively you can watch for changes (and automatically re-run tests) with:

```sh
yarn test:watch
```

## ⛏️ Built Using

- [ESLint](https://eslint.org/)
- [Jest](https://jestjs.io/)
- [Slack Bolt JS SDK](https://github.com/slackapi/bolt-js)
- [Typescript](https://www.typescriptlang.org/)

## ✍️ Authors

- [@bnjns](https://github.com/bnjns)
