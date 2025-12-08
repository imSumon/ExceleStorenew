import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface EMIPlanDB {
  id: string;
  name: string;
  months: number;
  interest_rate: number;
  min_amount: number;
  processing_fee: number;
  active: boolean;
  created_at: string;
}

export interface CouponDB {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number;
  max_discount: number | null;
  valid_from: string;
  valid_until: string;
  usage_limit: number | null;
  used_count: number;
  active: boolean;
  gift_item: string | null;
  created_at: string;
}

export async function fetchEMIPlans() {
  const { data, error } = await supabase
    .from('emi_plans')
    .select('*')
    .eq('active', true)
    .order('months', { ascending: true });

  if (error) {
    console.error('Error fetching EMI plans:', error);
    return [];
  }

  return data || [];
}

export async function fetchCoupons() {
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('active', true)
    .gt('valid_until', new Date().toISOString())
    .order('discount_value', { ascending: false });

  if (error) {
    console.error('Error fetching coupons:', error);
    return [];
  }

  return data || [];
}

export async function verifyCoupon(code: string) {
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('code', code.toUpperCase())
    .eq('active', true)
    .gt('valid_until', new Date().toISOString())
    .maybeSingle();

  if (error) {
    console.error('Error verifying coupon:', error);
    return null;
  }

  if (!data) {
    return null;
  }

  if (data.usage_limit && data.used_count >= data.usage_limit) {
    return null;
  }

  return data;
}

export async function createOrder(orderData: any) {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
    .single();

  if (error) {
    console.error('Error creating order:', error);
    throw error;
  }

  return data;
}

export async function createOrderItems(items: any[]) {
  const { data, error } = await supabase
    .from('order_items')
    .insert(items)
    .select();

  if (error) {
    console.error('Error creating order items:', error);
    throw error;
  }

  return data;
}

export async function incrementCouponUsage(couponCode: string) {
  const { error } = await supabase.rpc('increment_coupon_usage', {
    coupon_code: couponCode
  });

  if (error) {
    console.error('Error incrementing coupon usage:', error);
  }
}
