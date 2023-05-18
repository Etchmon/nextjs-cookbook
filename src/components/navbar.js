import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
    // Hook to access the Next.js session object
    const { data: session } = useSession();

    return (
        <nav className="bg-gray-900 shadow-sm py-4 px-8 flex justify-between items-center w-full z-10">
            <Link href="/" ><span className="text-xl font-bold text-green-500">CookBook Digital</span></Link>
            {!session ? (
                <div className="flex items-center space-x-4">
                    <Link href="/login" className="text-green-500 hover:text-green-200">
                        Log in
                    </Link>
                    <Link href="/signup" className="bg-green-500 text-gray-300 py-2 px-4 rounded hover:bg-green-600">
                        Sign up
                    </Link>
                </div>
            ) : (
                <div className="flex items-center space-x-4">
                    <Link href="/dashboard" className="text-green-500 hover:text-green-200">{session.user.username}</Link>
                    <button className="bg-green-500 text-gray-300 py-2 px-4 rounded hover:bg-green-600" onClick={() => signOut()}>
                        Sign out
                    </button>
                </div>
            )}
        </nav>
    )
}

export default Navbar;
