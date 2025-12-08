export interface Product {
  id: number
  name: string
  price: string
  image: string
  badge?: string
  colors: string[]
  storage: string[]
  colorLabel?: string
  priceAmount?: string
  savingsAmount?: string
  mrp?: string
  cashback?: string
  range: string
  storageCapacity: string[]
  displaySize: string
  features: string[]
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Galaxy A07 (4 GB Memory)',
    price: '৳9,749',
    image: '/images/products/3.png',
    badge: 'New',
    colors: ['#1A3A4A', '#2A2A2A', '#C8B8D8'],
    storage: ['64 GB'],
    colorLabel: 'Light Violet',
    priceAmount: '9749.00',
    savingsAmount: '750.00',
    mrp: '10499.00',
    cashback: '7000',
    range: 'Galaxy A',
    storageCapacity: ['64GB'],
    displaySize: '6.3-6.5"',
    features: ['Fast Charging']
  },
  {
    id: 2,
    name: 'Galaxy F07 (4 GB Memory)',
    price: '৳25,000',
    image: '/images/products/6.png',
    badge: 'New',
    colors: ['#1A5A4A'],
    storage: ['64 GB'],
    colorLabel: 'Green',
    priceAmount: '25000.00',
    savingsAmount: '1500.00',
    mrp: '26500.00',
    cashback: '7000',
    range: 'Galaxy F',
    storageCapacity: ['64GB'],
    displaySize: '6.3-6.5"',
    features: ['5G', 'Fast Charging']
  },
  {
    id: 3,
    name: 'Galaxy A17 5G',
    price: '৳14,999',
    image: '/images/products/1.png',
    badge: 'Quick Look',
    colors: ['#D4D4D4', '#1A1A1A', '#4A5A8A'],
    storage: ['64GB', '128GB'],
    range: 'Galaxy A',
    storageCapacity: ['64GB', '128GB'],
    displaySize: '6.3-6.5"',
    features: ['Fast Charging']
  },
  {
    id: 4,
    name: 'Galaxy A26 5G',
    price: '৳19,999',
    image: '/images/products/4.png',
    badge: 'Quick Look',
    colors: ['#1A1A1A', '#D4D4D4'],
    storage: ['128GB', '256GB'],
    range: 'Galaxy A',
    storageCapacity: ['128GB', '256GB'],
    displaySize: '6.3-6.5"',
    features: ['5G', 'Fast Charging']
  },
  {
    id: 5,
    name: 'Galaxy A36 5G',
    price: '৳29,999',
    image: '/images/products/5.png',
    badge: 'Quick Look',
    colors: ['#E8E8E8', '#1A1A1A', '#5A6F9E'],
    storage: ['128GB', '256GB'],
    range: 'Galaxy A',
    storageCapacity: ['128GB', '256GB'],
    displaySize: '6.3-6.5"',
    features: ['5G', 'Water Resistant']
  },
  {
    id: 6,
    name: 'Galaxy A56 5G',
    price: '৳39,999',
    image: '/images/products/6.png',
    badge: 'Quick Look',
    colors: ['#D4D4D4', '#1A1A1A', '#8A9A7A'],
    storage: ['256GB'],
    range: 'Galaxy A',
    storageCapacity: ['256GB'],
    displaySize: '6.3-6.5"',
    features: ['5G', 'Water Resistant', 'Fast Charging']
  },
  {
    id: 7,
    name: 'Galaxy A06',
    price: '৳8,999',
    image: '/images/products/7.png',
    badge: 'Quick Look',
    colors: ['#E8E8E8', '#1A1A1A', '#C8B8D8'],
    storage: ['64GB'],
    range: 'Galaxy A',
    storageCapacity: ['64GB'],
    displaySize: '6.3-6.5"',
    features: []
  },
  {
    id: 8,
    name: 'Galaxy A16 5G',
    price: '৳12,999',
    image: '/images/products/8.png',
    badge: 'Quick Look',
    colors: ['#1A1A1A', '#4A8A9A'],
    storage: ['128GB', '256GB'],
    range: 'Galaxy A',
    storageCapacity: ['128GB', '256GB'],
    displaySize: '6.3-6.5"',
    features: ['5G']
  },
  {
    id: 9,
    name: 'Galaxy Z Flip6',
    price: '৳109,999',
    image: '/images/products/Galaxy-Z-Flip7.jpg',
    badge: 'Quick Look',
    colors: ['#C8B8D8'],
    storage: ['256GB'],
    range: 'Galaxy S',
    storageCapacity: ['256GB'],
    displaySize: '6.5-6.8"',
    features: ['5G', 'Water Resistant', 'Wireless Charging']
  },
  {
    id: 10,
    name: 'Galaxy Z Fold6',
    price: '৳149,999',
    image: '/images/products/9.png',
    badge: 'Quick Look',
    colors: ['#C8C8C8'],
    storage: ['256GB', '512GB'],
    range: 'Galaxy S',
    storageCapacity: ['256GB', '512GB'],
    displaySize: '> 7.0"',
    features: ['5G', 'Water Resistant', 'Wireless Charging']
  },
  {
    id: 11,
    name: 'Galaxy S25 Ultra',
    price: '৳139,999',
    image: '/images/products/10.png',
    badge: 'Quick Look',
    colors: ['#5A6A7A', '#1A1A1A'],
    storage: ['256GB', '512GB', '1TB'],
    range: 'Galaxy S',
    storageCapacity: ['256GB', '512GB', '1TB'],
    displaySize: '6.5-6.8"',
    features: ['5G', 'Water Resistant', 'Wireless Charging', 'Fast Charging']
  },
  {
    id: 12,
    name: 'Galaxy S25+',
    price: '৳99,999',
    image: '/images/products/TabS10_Lite.jpg',
    badge: 'Quick Look',
    colors: ['#5A6F9E', '#1A1A1A'],
    storage: ['256GB', '512GB'],
    range: 'Galaxy S',
    storageCapacity: ['256GB', '512GB'],
    displaySize: '6.5-6.8"',
    features: ['5G', 'Water Resistant', 'Wireless Charging']
  }
]

export function getProductById(id: number): Product | undefined {
  return products.find(p => p.id === id)
}
