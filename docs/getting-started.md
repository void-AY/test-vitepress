# Getting Started

Welcome to the Sportsbook integration guide. This documentation will help you quickly set up and customize your sportsbook interface.

## Installation

Install the Sportsbook package using your preferred package manager:

```bash
pnpm install sportsbook joker-core
```

## Basic Setup

1. Import the library and styles

```typescript
import { Sportsbook } from "sportsbook/integration";
import { initJokerCore } from "joker-core";

import 'sportsbook/sportsbook.css';
```

2. Create a container element

```html
<div id="sportsbook-container"></div>
```

3. Initialize the Sportsbook

```typescript

const instance = initJokerCore("https://demo-bot.tapgame.tech/");

const sportsbook = new Sportsbook({
    wrapperId: 'sportsbook-container',
    coreInstance: instance,
});

sportsbook.build();

```

## Next Steps

Now that you have the basic setup working, explore these areas:

- **[API Functions](/documentation/api-functions)** - Learn about all available methods
- **[CSS Variables](/documentation/css-variables)** - Customize the visual appearance
- **[Platform Overview](/documentation/platform-overview)** - Understand the architecture
- **[Backend Integration](/documentation/backend-integration)** - Server-side setup guide

## Need Help?

If you encounter any issues during setup, check our troubleshooting section or reach out to our support team.