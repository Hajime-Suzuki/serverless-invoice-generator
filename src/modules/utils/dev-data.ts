const sender = {
  name: 'Hajime Suzuki',
  email: 'teashtahstahstahtsst@test.com',
  phone: '0612345678',
  btw: 'NL123408910238',
  kvk: 12341234,
  iban: 'NL12INGB1234567890',
  address: {
    streetAddress: 'Super-test Street test test',
    postalCode: '1234AB',
    city: 'Amsterdam',
    country: 'Netherlands',
  },
}

const receiver = {
  name: 'Test company international 1234 1234 1234 B.V',
  email: 'test@email.com',
  address: {
    streetAddress: 'some test street 123',
    postalCode: '9875 AB',
    city: 'Rotterdam',
    country: 'Netherlands',
  },
}

const invoiceInfo = {
  invoiceTitle: 'Invoice Title',
  invoiceNumber: '20185843ashtashtashta',
  invoiceDate: '2018-12-22',
}

const items = [
  { name: 'test', price: '12.34', quantity: 1, taxRate: '9' },
  { name: 'test', price: '13.45', quantity: 2, taxRate: '21' },
  { name: 'test', price: '9.99', quantity: 3, taxRate: '21' },
  { name: 'testasht ashta sht asht ', price: '12.01', quantity: 5, taxRate: 21 },
  {
    name: 'some  ahst ahashasht ahtaahsr  ahst a ahst aasht ash tash asht ash tasht ',
    price: '1055000.01',
    quantity: 2,
    taxRate: 21,
  },
  { name: 'another1', price: '116.01', quantity: 1, taxRate: 21 },
  { name: 'another2', price: '116.01', quantity: 1, taxRate: 21 },
  { name: 'another3', price: '116.01', quantity: 1, taxRate: 21 },
  { name: 'another4', price: '116.01', quantity: 1, taxRate: 21 },
  { name: 'another5', price: '116.01', quantity: 1, taxRate: 21 },
  { name: 'another6', price: '116.01', quantity: 1, taxRate: 21 },
]

const totalPrices = {
  subtotal: 123,
  taxTotal: 1234,
  grandTotal: 123456,
}

export const data = {
  invoiceInfo,
  sender,
  receiver,
  items,
  totalPrices,
}
