import { Link } from "@/i18n/routing";

export const EmptyCartMessage = () => {
  return (
    <div
      className="py-48 px-2 flex flex-col justify-center items-start"
      data-testid="empty-cart-message"
    >
      <h1
        className="flex flex-row text-3xl-regular gap-x-2 items-baseline"
      >
        Carrito
      </h1>
      <p className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        Aun no tienes nada en tu carrito. Accede mediante el link debajo al
        catalogo de productos
      </p>
      <div>
        <Link href="/store">Explorar</Link>
      </div>
    </div>
  );
};
