import React, { useState, useCallback } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { NextPage } from 'next';

import { SearchInput } from '../../components/SearchInput';
import { Layout } from '../../components/Layout';
import { Character } from '../../types';
import { CharacterResult, QueryCharacterVariables, CHARACTER_QUERY } from '../../query';
import { CharactersList } from '../../components/CharactersList';
import { Party, usePartyState } from '../../components/Party';

import css from './styles.module.css';

const Home: NextPage = () => {
    const [characters, setCharacters] = useState<Character[] | null>(null);
    const { party, pickMemberToParty } = usePartyState();

    const [loadCharacters, { loading, error }] = useLazyQuery<
        CharacterResult,
        QueryCharacterVariables
    >(CHARACTER_QUERY, {
        onCompleted: data => setCharacters(data.characters.results),
    });

    const onValueChange = useCallback(
        (name: string) => loadCharacters({ variables: { name } }),
        [],
    );
    const onSearchReset = useCallback(() => setCharacters([]), []);

    return (
        <Layout className={css.root} documentTitle={'Rick and Morty Party'}>
            <Party party={party} />

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

            <CharactersList
                characters={characters || []}
                onSelect={pickMemberToParty}
                elementsInRow={4}
            />
        </Layout>
    );
};

export default Home;
