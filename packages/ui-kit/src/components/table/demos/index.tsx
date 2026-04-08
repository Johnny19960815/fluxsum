import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@fluxsum/ui-kit';

const invoices = [
  { invoice: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
  { invoice: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
  { invoice: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
  { invoice: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
];

export default () => {
  return (
    <Table>
      <TableCaption>A list of recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead style={{ textAlign: 'right' }}>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((inv) => (
          <TableRow key={inv.invoice}>
            <TableCell style={{ fontWeight: 500 }}>{inv.invoice}</TableCell>
            <TableCell>{inv.status}</TableCell>
            <TableCell>{inv.method}</TableCell>
            <TableCell style={{ textAlign: 'right' }}>{inv.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
