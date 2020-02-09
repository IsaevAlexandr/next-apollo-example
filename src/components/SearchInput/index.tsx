import React, { useState, useCallback, FC } from 'react';
import cn from 'classnames';

import { debounce } from '../../util/debounce';
import { CloseButton } from '../CloseButton';

import css from './styles.module.css';

interface SearchInputProps {
    onReset?: () => void;
    onValueChange: (value: string) => void;
    debounceTime?: number;
    className?: string;
    placeholder?: string;
}

export const SearchInput: FC<SearchInputProps> = ({
    onReset,
    className,
    onValueChange,
    debounceTime,
    placeholder,
}) => {
    const [value, setValue] = useState('');

    const debouncedOnValueChangeHandler = useCallback(debounce(onValueChange, debounceTime), [
        onValueChange,
    ]);

    const onChange = useCallback(
        ({ target: { value } }) => {
            setValue(value);

            if (value.length > 2) {
                debouncedOnValueChangeHandler(value);
            }
        },
        [onValueChange],
    );

    const resetSearch = useCallback(() => {
        setValue('');
        onReset && onReset();
    }, [onReset]);

    return (
        <div className={cn(css.root, className)}>
            <input
                placeholder={placeholder}
                className={css.input}
                value={value}
                onChange={onChange}
            />

            {(value.length > 0 || onReset) && (
                <CloseButton className={css.closeButton} onClick={resetSearch}>
                    X
                </CloseButton>
            )}
        </div>
    );
};
