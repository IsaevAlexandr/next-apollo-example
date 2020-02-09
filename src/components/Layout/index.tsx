import React, { FC } from 'react';
import cn from 'classnames';
import Head from 'next/head';

import css from './styles.module.css';

interface LayoutProps {
    className?: string;
    documentTitle?: string;
}

export const Layout: FC<LayoutProps> = ({ children, className, documentTitle }) => (
    <div className={css.root}>
        <Head>
            <title>{documentTitle}</title>
            <link
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap"
                rel="stylesheet"
            />
        </Head>

        <main className={cn(css.main, className)}>{children}</main>
    </div>
);
