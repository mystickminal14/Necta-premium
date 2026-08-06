import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { Pack, Product } from "./products";

/* ------------------------------------------------------------------ *
 * Cart state. There is no backend — the order is assembled here and
 * handed off to WhatsApp or email at checkout (see ./order.ts), so the
 * only persistence we need is localStorage.
 * ------------------------------------------------------------------ */

export interface CartLine {
  /** productId + size — one line per product/pack-size pairing */
  key: string;
  productId: string;
  name: string;
  size: string;
  kg: number;
  unitPrice: number;
  qty: number;
}

interface CartValue {
  lines: CartLine[];
  /** total number of bags across all lines */
  count: number;
  totalKg: number;
  subtotal: number;
  add: (product: Product, pack: Pack, qty: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}

const CartContext = createContext<CartValue | null>(null);

const STORAGE_KEY = "necta-cart-v1";
const MAX_QTY = 99;

function readStored(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // guard against a stale/hand-edited payload shape
    return parsed.filter(
      (l): l is CartLine =>
        !!l &&
        typeof l === "object" &&
        typeof (l as CartLine).key === "string" &&
        typeof (l as CartLine).qty === "number",
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(readStored);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* private mode / quota — the cart still works for this session */
    }
  }, [lines]);

  const add = useCallback((product: Product, pack: Pack, qty: number) => {
    const key = `${product.id}::${pack.size}`;
    setLines((prev) => {
      const found = prev.find((l) => l.key === key);
      if (found) {
        return prev.map((l) =>
          l.key === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l,
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: product.name,
          size: pack.size,
          kg: pack.kg,
          unitPrice: pack.price,
          qty: Math.min(MAX_QTY, qty),
        },
      ];
    });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)),
    );
  }, []);

  const remove = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartValue>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const totalKg = lines.reduce((n, l) => n + l.kg * l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + l.unitPrice * l.qty, 0);
    return { lines, count, totalKg, subtotal, add, setQty, remove, clear, open, setOpen };
  }, [lines, add, setQty, remove, clear, open]);

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
