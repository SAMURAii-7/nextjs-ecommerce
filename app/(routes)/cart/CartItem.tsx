"use client";

import Image from "next/image";
import { CartItemWithProduct } from "@/lib/db/cart";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import { useTransition } from "react";

interface Props {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

const CartItem = ({
  cartItem: { product, quantity },
  setProductQuantity,
}: Props) => {
  const [isPending, startTransition] = useTransition();

  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option key={i} value={i}>
        {i}
      </option>,
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />
        <div>
          <div className="flex flex-row">
            <Link href={"/products/" + product.id} className="font-bold">
              {product.name}
            </Link>
            <div className="mx-3 flex items-center">
              <span
                onClick={() => {
                  startTransition(() => {
                    setProductQuantity(product.id, 0);
                  });
                }}
                className="cursor-pointer text-xs text-red-500"
              >
                Delete
              </span>
            </div>
          </div>
          <div>Price: {formatPrice(product.price)}</div>
          <div className="my-1 flex items-center gap-2">
            Quantity:
            <select
              className="select select-bordered w-full max-w-[80px]"
              defaultValue={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value);
                startTransition(() => {
                  setProductQuantity(product.id, newQuantity);
                });
              }}
            >
              <option value={0}>0 (Remove)</option>
              {quantityOptions}
            </select>
          </div>
          <div className="flex items-center gap-2">
            Total: {formatPrice(product.price * quantity)}
            {isPending && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default CartItem;
