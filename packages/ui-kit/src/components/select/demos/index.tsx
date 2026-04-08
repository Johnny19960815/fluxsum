import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 300 }}>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
        </SelectContent>
      </Select>
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Disabled select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option">Option</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
