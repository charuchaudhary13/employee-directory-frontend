// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import ApolloWrapper from '@/components/ApolloWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
title: 'Employee Directory',
description: 'GraphQL MERN Stack App',
};

export default function RootLayout({
children,
}: {
children: React.ReactNode;
}) {
return (
<html lang="en">
<body className={inter.className}>
<ApolloWrapper>
{children}
</ApolloWrapper>
</body>
</html>
);
}

 