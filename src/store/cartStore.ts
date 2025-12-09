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
  discountPercent?: number;
  productId?: string;
  fullCoverage?: boolean;
}

export interface EMIPlan {
  id: string;
  name: string;
  months: number;
  interestRate: number;
  minAmount: number;
  processingFee: number;
  active: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  maxDiscount: number | null;
  giftItem: string | null;
  validUntil: string;
}

interface CartState {
  items: CartItem[];
  selectedEMI: EMIPlan | null;
  appliedCoupon: Coupon | null;
}

const state = reactive<CartState>({
  items: [],
  selectedEMI: null,
  appliedCoupon: null
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

  const updateFullCoverage = (id: string, fullCoverage: boolean) => {
    const item = state.items.find(item => item.id === id);
    if (item) {
      item.fullCoverage = fullCoverage;
    }
  };

  const clearCart = () => {
    state.items = [];
    state.selectedEMI = null;
    state.appliedCoupon = null;
  };

  const setEMIPlan = (plan: EMIPlan | null) => {
    state.selectedEMI = plan;
  };

  const applyCoupon = (coupon: Coupon | null) => {
    state.appliedCoupon = coupon;
  };

  const removeCoupon = () => {
    state.appliedCoupon = null;
  };

  const subtotal = computed(() => {
    return state.items.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      const coverageCharge = item.fullCoverage ? 5000 : 0;
      return total + itemTotal + coverageCharge;
    }, 0);
  });

  const productDiscounts = computed(() => {
    return state.items.reduce((total, item) => {
      if (item.discountPercent && item.originalPrice > item.price) {
        return total + ((item.originalPrice - item.price) * item.quantity);
      }
      return total;
    }, 0);
  });

  const couponDiscount = computed(() => {
    if (!state.appliedCoupon) return 0;

    const sub = subtotal.value;
    const coupon = state.appliedCoupon;

    if (sub < coupon.minOrderAmount) return 0;

    if (coupon.discountType === 'percentage') {
      const discount = (sub * coupon.discountValue) / 100;
      return coupon.maxDiscount ? Math.min(discount, coupon.maxDiscount) : discount;
    } else {
      return coupon.discountValue;
    }
  });

  const totalDiscount = computed(() => {
    return productDiscounts.value + couponDiscount.value;
  });

  const taxAmount = computed(() => {
    const taxableAmount = subtotal.value - totalDiscount.value;
    return Math.max(0, taxableAmount * 0.18);
  });

  const finalTotal = computed(() => {
    const total = subtotal.value - totalDiscount.value + taxAmount.value;
    return Math.max(0, total);
  });

  const emiMonthlyAmount = computed(() => {
    if (!state.selectedEMI) return null;

    const principal = finalTotal.value + state.selectedEMI.processingFee;
    const monthlyInterest = state.selectedEMI.interestRate / 100 / 12;
    const months = state.selectedEMI.months;

    if (state.selectedEMI.interestRate === 0) {
      return principal / months;
    }

    const emi = (principal * monthlyInterest * Math.pow(1 + monthlyInterest, months)) /
                (Math.pow(1 + monthlyInterest, months) - 1);
    return emi;
  });

  const cartTotal = computed(() => finalTotal.value);

  const cartCount = computed(() => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  });

  return {
    items: computed(() => state.items),
    selectedEMI: computed(() => state.selectedEMI),
    appliedCoupon: computed(() => state.appliedCoupon),
    addToCart,
    removeFromCart,
    updateQuantity,
    updateFullCoverage,
    clearCart,
    setEMIPlan,
    applyCoupon,
    removeCoupon,
    subtotal,
    productDiscounts,
    couponDiscount,
    totalDiscount,
    taxAmount,
    finalTotal,
    emiMonthlyAmount,
    cartTotal,
    cartCount
  };
};
