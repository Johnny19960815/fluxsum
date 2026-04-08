import { Button, DropdownMenu } from '@fluxsum/ui';

import { dangerItems } from './data';

export default () => {
  return (
    <DropdownMenu nativeButton items={dangerItems}>
      <Button danger>Danger Items</Button>
    </DropdownMenu>
  );
};
