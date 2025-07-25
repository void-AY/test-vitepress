# API Functions
## Base Initialization

The foundation of working with the Sportsbook library starts with proper initialization.

### Basic Setup

```typescript
import { Sportsbook } from 'sportsbook';
import 'sportsbook/sportsbook.css';

// Initialize Sportsbook with your wrapper ID and backend URL
const sportsbookInstance = new Sportsbook({
    wrapperId: '<YOUR_WRAPPER_ID>',
    backendUrl: '<YOUR_BACKEND_URL>',
}); 

// Build the Sportsbook interface
sportsbookInstance.build();
```

### React Integration Example

Here's how to integrate the Sportsbook with a React component:

```typescript
// on your Sportsbook route component

import { Sportsbook } from 'sportsbook';
import { useEffect } from 'react';

import 'sportsbook/sportsbook.css';

export const SportsbookRoute = () => {
 
    useEffect(() => {
        const instance = new Sportsbook({
            wrapperId: 'sportsbook-wrapper',
            backendUrl: 'https://tapgame.backend.com/api/v1',
        });

        instance.build();

        // Destroy the Sportsbook instance when the component unmounts
        return () => {
            instance.destroy();
        };
    }, []);

    return (
        <div className="sportsbook-wrapper">
            <div id="sportsbook-wrapper" />
        </div>
    )
}
```

## Theme Management

### Change Color Theme

Update the theme (dark or light) of the Sportsbook interface.

```typescript
import { changeSportsbookTheme } from 'sportsbook';

/* 
* theme: 'dark' | 'light'
*/
changeSportsbookTheme('dark');
```

**Parameters:**
- `theme` (`'dark' | 'light'`): The theme to apply

### Update Locale

Change the language/locale of the Sportsbook interface.

```typescript
import { changeSportbookLocale } from 'sportsbook';

/* 
* locale: 'ru' | 'en'
*/
changeSportbookLocale('en');
```

**Parameters:**
- `locale` (`'ru' | 'en'`): The locale to apply

## Event Handling

### on(event, callback)

Subscribe to Sportsbook events to handle user interactions and system events.

```typescript
sportsbook.on('betPlaced', (bet) => {
  console.log('Ставка размещена:', bet);
});
```

**Parameters:**
- `event` (`string`): The event name to listen for
- `callback` (`Function`): The function to call when the event occurs

**Returns:** `void`

## Instance Methods

### build()

Renders the Sportsbook interface into the specified wrapper element.

```typescript
sportsbookInstance.build();
```

### destroy()

Cleans up the Sportsbook instance and removes all event listeners.

```typescript
sportsbookInstance.destroy();
```

**Important:** Always call `destroy()` when unmounting components to prevent memory leaks.

## Configuration Options

When initializing a new Sportsbook instance, you can pass the following configuration options:

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `wrapperId` | `string` | Yes | The ID of the DOM element where the Sportsbook will be rendered |
| `backendUrl` | `string` | Yes | The base URL for your backend API |
| `theme` | `'dark' \| 'light'` | No | Initial theme (defaults to 'light') |
| `locale` | `'ru' \| 'en'` | No | Initial locale (defaults to 'en') |

## Error Handling

Always wrap your Sportsbook operations in try-catch blocks to handle potential errors:

```typescript
try {
    const instance = new Sportsbook({
        wrapperId: 'sportsbook-wrapper',
        backendUrl: 'https://your-api.com',
    });
    
    instance.build();
} catch (error) {
    console.error('Failed to initialize Sportsbook:', error);
}
```