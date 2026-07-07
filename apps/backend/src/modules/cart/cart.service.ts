import { type CartItems, cartRepository } from '@freshly/redis';
import type { Cart, CartItem, ProductId, UserId } from '@freshly/contracts';
import { ConflictError, NotFoundError } from '../../errors/app-error';
import { productService } from '../product';

export class CartService {
  public async getCart(userId: UserId): Promise<Cart> {
    const items = await cartRepository.getItems(userId);
    return this.buildCart(userId, items);
  }

  public async addItem(userId: UserId, productId: ProductId): Promise<Cart> {
    const product = await productService.findById(productId);
    if (!product) throw new NotFoundError('Product not found');

    const wasAdded = await cartRepository.addItem(userId, productId);
    if (!wasAdded) throw new ConflictError('Item already in cart');

    return this.getCart(userId);
  }

  public async updateItem(userId: UserId, productId: ProductId, quantity: number): Promise<Cart> {
    const items = await cartRepository.getItems(userId);
    if (!(productId in items)) throw new NotFoundError('Item not found in cart');

    await cartRepository.updateItem(userId, productId, quantity);
    return this.getCart(userId);
  }

  public async removeItem(userId: UserId, productId: ProductId): Promise<Cart> {
    await cartRepository.removeItem(userId, productId);
    return this.getCart(userId);
  }

  public async clearCart(userId: UserId): Promise<Cart> {
    await cartRepository.clearCart(userId);
    return { items: [], total: 0, itemCount: 0 };
  }

  private async buildCart(userId: UserId, items: CartItems): Promise<Cart> {
    const productIds = Object.keys(items).map(Number) as ProductId[];
    if (productIds.length === 0) return { items: [], total: 0, itemCount: 0 };

    const products = await productService.findByIds(productIds);
    const productMap = new Map(products.map((prod) => [prod.id, prod]));

    const cartItems: CartItem[] = [];
    let total = 0;
    let itemCount = 0;

    for (const [productIdRaw, storedQuantity] of Object.entries(items)) {
      const productId = Number(productIdRaw) as ProductId;
      const product = productMap.get(productId);
      if (!product) continue;

      const isUnavailable = Boolean(product.deletedAt) || !product.isActive || product.stock === 0;

      if (isUnavailable) {
        cartItems.push({
          productId,
          name: product.name,
          imageUrl: product.imageUrls[0],
          price: product.price,
          salePrice: product.salePrice,
          quantity: 0,
          isUnavailable: true
        });
        continue;
      }

      const quantity = Math.min(storedQuantity, product.stock);
      if (quantity !== storedQuantity) {
        await cartRepository.updateItem(userId, productId, quantity);
      }

      cartItems.push({
        productId,
        name: product.name,
        imageUrl: product.imageUrls[0],
        price: product.price,
        salePrice: product.salePrice,
        quantity,
        isUnavailable: false
      });

      total += (product.salePrice ?? product.price) * quantity;
      itemCount += quantity;
    }

    return { items: cartItems, total, itemCount };
  }
}

export const cartService = new CartService();
