import React, { useState, useCallback, useMemo, FC } from 'react';

import { Character } from '../../types';
import { transformToRows } from '../../util/transformToRows';
import { CharacterCard } from '../CharacterCard';

import css from './styles.module.css';

interface CharactersListProps {
    characters: Character[];
    elementsInRow?: number;
    onSelect: (character: Character) => () => void;
}

export const CharactersList: FC<CharactersListProps> = ({
    onSelect,
    characters,
    elementsInRow = 4,
}) => {
    const [ignoredCharacters, addToIgnored] = useState<Record<number, boolean>>({});

    const preparedCharacters = useMemo(
        () =>
            transformToRows<Character>({
                data: characters || [],
                ignore: ignoredCharacters,
                elementsInRow,
            }),
        [characters, elementsInRow, ignoredCharacters],
    );

    const markAsNotInterested = useCallback(
        ({ id }: Character) => () =>
            addToIgnored(state => ({
                ...state,
                [id]: true,
            })),
        [],
    );

    return (
        <div className={css.root}>
            {Boolean(preparedCharacters[0].length) &&
                preparedCharacters.map((row, i) => (
                    <div className={css.row} key={i}>
                        {row.map(character => (
                            <CharacterCard
                                {...character}
                                key={character.name}
                                onClose={markAsNotInterested(character)}
                                onSelect={onSelect(character)}
                            />
                        ))}
                    </div>
                ))}
        </div>
    );
};
