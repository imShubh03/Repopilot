import { db } from '@/server/db';
import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import { notFound, redirect } from 'next/navigation';

export default async function SyncUser() {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not found");
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const email = user.emailAddresses[0]?.emailAddress;

    if (!email) {
        return notFound();
    }

    await db.User.upsert({
        where: {
            emailAddress: email,
        },
        update: {
            imageUrl: user.imageUrl,
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
        },
        create: {
            id: userId,
            emailAddress: email,
            imageUrl: user.imageUrl,
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
        },
    });

    console.log(`User synced successfully: ${userId}`);
    redirect('/dashboard'); 
}