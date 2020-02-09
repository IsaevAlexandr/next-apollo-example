import React, { FC, useCallback, memo } from 'react';
import cn from 'classnames';

import { CloseButton } from '../CloseButton';
import { Character } from '../../types';

import css from './styles.module.css';

interface CharacterCardProps extends Partial<Character> {
    title?: string;
    onSelect?: () => void;
    onClose?: () => void;
}

export const CharacterCard: FC<CharacterCardProps> = ({ image, onSelect, onClose, title }) => {
    const handleOnClose = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
            onClose && onClose();
        },
        [onClose],
    );

    return (
        <div
            className={cn(css.root, onSelect && css.hoverable)}
            onClick={onSelect}
            style={image ? { backgroundImage: `url(${image})` } : undefined}
        >
            {onClose && (
                <CloseButton className={css.closeButton} onClick={handleOnClose}>
                    <span className={css.close}>+</span>
                </CloseButton>
            )}

            {!image && title && <span className={css.cardTitle}>{title}</span>}
        </div>
    );
};
