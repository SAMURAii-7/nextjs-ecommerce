import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import logo from "@/assets/logo.png";
import { getCart } from "@/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../(routes)/api/auth/[...nextauth]/route";
import SearchInput from "./SearchInput";

const searchProducts = async (formData: FormData) => {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
};

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const cart = await getCart();

  return (
    <nav className="bg-base-100">
      <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image src={logo} alt="Flowmazon logo" width={40} height={40} />
            Flowmazon
          </Link>
        </div>
        <div className="flex-none gap-2">
          <SearchInput searchProducts={searchProducts} />
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
