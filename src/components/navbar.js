import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
    // Hook to access the Next.js session object
    const { data: session } = useSession();

    return (
        <nav className="fixed top:0 shadow-sm py-4 px-2 md:px-8 flex flex-wrap gap-4 justify-around items-center w-full z-20">
            <Link href="/" className='text-white whitespace-nowrap'>CookBook Digital</Link>
            {!session ? (
                <div className="flex items-center space-x-4">
                    <Link href="/login" className="text-green-500 hover:text-green-200 whitespace-nowrap">
                        Log in
                    </Link>
                    <Link href="/signup" className="bg-green-500 text-gray-300 py-2 px-4 rounded hover:bg-green-600 whitespace-nowrap">
                        Sign up
                    </Link>
                </div>
            ) : (
                <div className="flex items-center gap-4 space-x-4">
                    <Link href="/dashboard" className="text-green-500 hover:text-green-200 whitespace-nowrap">Dashboard</Link>
                    <button className="bg-green-500 text-gray-300 py-2 px-4 rounded hover:bg-green-600 whitespace-nowrap" onClick={() => signOut()}>
                        Sign out
                    </button>
                </div>
            )}
        </nav>
    )
}

export default Navbar;
