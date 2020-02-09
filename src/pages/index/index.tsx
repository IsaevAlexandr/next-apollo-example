import React, { useState, useCallback, useMemo } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { NextPage } from 'next';

import { CharacterCard } from '../../components/CharacterCard';
import { isMorty, isRick } from '../../util/checkCharacters';
import { SearchInput } from '../../components/SearchInput';
import { Layout } from '../../components/Layout';
import { Character, focusCards } from '../../types';
import { transformToRows } from '../../util/transformToRows';
import { CharacterResult, QueryCharacterVariables, CHARACTER_QUERY } from '../../query';

import css from './styles.module.css';

const Home: NextPage = () => {
    const [characters, setCharacters] = useState<Character[] | null>(null);
    const [ignoredCards, addToIgnored] = useState<Record<number, boolean>>({});

    const [party, setParty] = useState<Record<focusCards, Character | null>>({
        [focusCards.morty]: null,
        [focusCards.rick]: null,
    });

    const [loadGreeting, { loading, error }] = useLazyQuery<
        CharacterResult,
        QueryCharacterVariables
    >(CHARACTER_QUERY, {
        onCompleted: data => setCharacters(data.characters.results),
    });

    const preparedCharacters = useMemo(
        () =>
            transformToRows<Character>({
                data: characters || [],
                ignore: ignoredCards,
                elementsInRow: 4,
            }),
        [characters, ignoredCards],
    );

    const markAsNotInterested = useCallback(
        ({ id }: Character) => () =>
            addToIgnored(state => ({
                ...state,
                [id]: true,
            })),
        [],
    );
    const pickPatryMember = useCallback(
        (character: Character) => () => {
            if (isMorty(character.name)) {
                setParty(state => ({
                    ...state,
                    [focusCards.morty]: character,
                }));
            }

            if (isRick(character.name)) {
                setParty(state => ({
                    ...state,
                    [focusCards.rick]: character,
                }));
            }
        },
        [],
    );
    const onValueChange = useCallback((name: string) => loadGreeting({ variables: { name } }), []);
    const onSearchReset = useCallback(() => setCharacters([]), []);

    return (
        <Layout className={css.root} documentTitle={'Rick and Morty Party'}>
            <div className={css.party}>
                <div className={css.partyTitle}>Party</div>
                <div className={css.partyCards}>
                    <CharacterCard {...party[focusCards.rick]} title="Rick" />
                    <CharacterCard {...party[focusCards.morty]} title="Morty" />
                </div>
            </div>

            <div className={css.status}>
                {loading && <div className={css.loading}>Loading...</div>}
                {error && (
                    <div className={css.error}>Error - something goes wrong, try again later</div>
                )}
            </div>

            <SearchInput
                className={css.searchInput}
                onValueChange={onValueChange}
                onReset={characters?.length ? onSearchReset : undefined}
                placeholder="Enter character name"
                debounceTime={300}
            />

            <div className={css.cardsContainer}>
                {Boolean(preparedCharacters?.[0]?.length) &&
                    preparedCharacters.map((row, i) => (
                        <div className={css.cardsRow} key={i}>
                            {row.map(character => (
                                <CharacterCard
                                    {...character}
                                    key={character.name}
                                    onClose={markAsNotInterested(character)}
                                    onSelect={pickPatryMember(character)}
                                />
                            ))}
                        </div>
                    ))}
            </div>
        </Layout>
    );
};

export default Home;
