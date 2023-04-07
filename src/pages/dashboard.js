import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import clientPromise from '../../lib/mongodb';
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import Link from 'next/link';

export default function Dashboard() {

    const { data: session, status } = useSession();


}

// Redirect to Login page if User is not signed in.