import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { CartProvider, useCart, CartItem } from './CartContext';

describe('CartContext', () => {
  beforeEach(() => {
    // 清除 localStorage
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('應該初始化空購物車', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(CartProvider, {}, children);
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalAmount).toBe(0);
  });

  it('應該能夠加入商品到購物車', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(CartProvider, {}, children);
    const { result } = renderHook(() => useCart(), { wrapper });

    const item: CartItem = {
      id: 1,
      name: '貓咪鮮食雞肉片',
      price: 299,
      quantity: 1,
    };

    act(() => {
      result.current.addItem(item);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual(item);
    expect(result.current.totalItems).toBe(1);
    expect(result.current.totalAmount).toBe(299);
  });

  it('應該能夠增加相同商品的數量', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(CartProvider, {}, children);
    const { result } = renderHook(() => useCart(), { wrapper });

    const item: CartItem = {
      id: 1,
      name: '貓咪鮮食雞肉片',
      price: 299,
      quantity: 1,
    };

    act(() => {
      result.current.addItem(item);
      result.current.addItem(item);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]?.quantity).toBe(2);
    expect(result.current.totalItems).toBe(2);
    expect(result.current.totalAmount).toBe(598);
  });

  it('應該能夠更新商品數量', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(CartProvider, {}, children);
    const { result } = renderHook(() => useCart(), { wrapper });

    const item: CartItem = {
      id: 1,
      name: '貓咪鮮食雞肉片',
      price: 299,
      quantity: 1,
    };

    act(() => {
      result.current.addItem(item);
      result.current.updateQuantity(1, 5);
    });

    expect(result.current.items[0]?.quantity).toBe(5);
    expect(result.current.totalItems).toBe(5);
    expect(result.current.totalAmount).toBe(1495);
  });

  it('應該能夠移除商品', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(CartProvider, {}, children);
    const { result } = renderHook(() => useCart(), { wrapper });

    const item: CartItem = {
      id: 1,
      name: '貓咪鮮食雞肉片',
      price: 299,
      quantity: 1,
    };

    act(() => {
      result.current.addItem(item);
      result.current.removeItem(1);
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalAmount).toBe(0);
  });

  it('當數量設為 0 時應該移除商品', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(CartProvider, {}, children);
    const { result } = renderHook(() => useCart(), { wrapper });

    const item: CartItem = {
      id: 1,
      name: '貓咪鮮食雞肉片',
      price: 299,
      quantity: 1,
    };

    act(() => {
      result.current.addItem(item);
      result.current.updateQuantity(1, 0);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('應該能夠清空購物車', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(CartProvider, {}, children);
    const { result } = renderHook(() => useCart(), { wrapper });

    const item1: CartItem = {
      id: 1,
      name: '貓咪鮮食雞肉片',
      price: 299,
      quantity: 1,
    };

    const item2: CartItem = {
      id: 2,
      name: '狗狗磨牙肉乾',
      price: 399,
      quantity: 1,
    };

    act(() => {
      result.current.addItem(item1);
      result.current.addItem(item2);
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalAmount).toBe(0);
  });

  it('應該正確計算多個商品的合計金額', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(CartProvider, {}, children);
    const { result } = renderHook(() => useCart(), { wrapper });

    const item1: CartItem = {
      id: 1,
      name: '貓咪鮮食雞肉片',
      price: 299,
      quantity: 2,
    };

    const item2: CartItem = {
      id: 2,
      name: '狗狗磨牙肉乾',
      price: 399,
      quantity: 3,
    };

    act(() => {
      result.current.addItem(item1);
      result.current.addItem(item2);
    });

    expect(result.current.totalItems).toBe(5);
    expect(result.current.totalAmount).toBe(299 * 2 + 399 * 3);
  });
});
