import "@medusajs/types"
import { SellerProps } from "./types/seller"

declare module '*.lodash';

declare module "@medusajs/types" {
    interface StoreProduct {
        seller?: SellerProps
    }
}