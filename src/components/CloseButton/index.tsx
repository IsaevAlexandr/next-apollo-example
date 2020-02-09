import React, { FC } from 'react';
import cn from 'classnames';

import css from './styles.module.css';

interface CloseButtonProps {
    className?: string;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export const CloseButton: FC<CloseButtonProps> = ({ children, className, ...props }) => (
    <button className={cn(css.root, className)} {...props}>
        {children}
    </button>
);
