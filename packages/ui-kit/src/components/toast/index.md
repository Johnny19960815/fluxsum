---
nav: Components
group: Feedback
title: Toast
description: Toast component for brief notification messages. Supports success, error, warning, and info types with auto-dismiss.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## APIs

### useToast

Returns a `toast` function to trigger notifications.

```ts
const { toast } = useToast();

toast({
  title: 'Event has been created',
  description: 'Monday, January 3rd at 6:00pm',
  variant: 'default' | 'destructive',
});
```

### Toaster

Place `<Toaster />` at the root of your app to enable toasts.
