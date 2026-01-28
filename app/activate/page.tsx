"use client";

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import UserActivateForm from '@/components/activate/user-activate-form';
import UserActivateSuspense from '@/components/activate/user-activate-suspense';
import UserActivateNoCode from '@/components/activate/user-activate-no-code';

export default function ActivateUserPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const router = useRouter();

    if (!token) {
        return <UserActivateNoCode />;
    }

    return (
        <Suspense fallback={<UserActivateSuspense />}>
            <UserActivateForm token={token} />
        </Suspense>
    );
}