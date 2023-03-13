import React, { useEffect } from "react"
import { useSession, signIn, signOut, getSession } from "next-auth/react"

const Login = () => {
    const {data: session} = useSession();
    let {status: auth} = useSession();
    console.log(auth);

    if (session) {
        return (
            <div>
                <p>Welcome {session.user.username}</p>
                <button onClick={()=> signOut()}>Sign Out</button>
            </div>
        )
    }

    return (
        <div>
            <p>You are not signed in</p>
            <button onClick={()=> signIn()}>Sign in</button>
        </div>
    )

}

export default Login;

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    

    if(session) {
        return {
            redirect: {
                destination: '/'
            }
        }
    }

    return {
        props: {...session}
    }
}

