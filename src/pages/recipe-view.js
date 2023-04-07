import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import clientPromise from '../../lib/mongodb';
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import Link from 'next/link';

export default function RecipeView() {

    const { data: session, status } = useSession();

    return (
        <main>

        </main>
    )
}
