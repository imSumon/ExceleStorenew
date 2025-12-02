import { reactive, computed } from 'vue';

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  quantity: number;
  storage: string;
  ram: string;
  color: string;
}

interface CartState {
  items: CartItem[];
}

const state = reactive<CartState>({
  items: []
});

export const useCart = () => {
  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const existingItem = state.items.find(
      i => i.name === item.name &&
           i.storage === item.storage &&
           i.ram === item.ram &&
           i.color === item.color
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      state.items.push({
        ...item,
        id: `${Date.now()}-${Math.random()}`
      });
    }
  };

  const removeFromCart = (id: string) => {
    const index = state.items.findIndex(item => item.id === id);
    if (index > -1) {
      state.items.splice(index, 1);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    const item = state.items.find(item => item.id === id);
    if (item && quantity > 0) {
      item.quantity = quantity;
    }
  };

  const clearCart = () => {
    state.items = [];
  };

  const cartTotal = computed(() => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  });

  const cartCount = computed(() => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  });

  return {
    items: computed(() => state.items),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount
  };
};
