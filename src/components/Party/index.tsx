import React, { useState, useCallback, FC } from 'react';

import { CharacterCard } from '../../components/CharacterCard';
import { isMorty, isRick } from '../../util/checkCharacters';
import { Character } from '../../types';

import css from './styles.module.css';

enum partyMembers {
    rick = 'Rick',
    morty = 'Morty',
}

interface PartyProps {
    party: Record<partyMembers, Character | null>;
}

export const usePartyState = () => {
    const [party, setParty] = useState<PartyProps['party']>({
        [partyMembers.morty]: null,
        [partyMembers.rick]: null,
    });

    const pickMemberToParty = useCallback(
        (character: Character) => () => {
            if (isMorty(character.name)) {
                setParty(state => ({
                    ...state,
                    [partyMembers.morty]: character,
                }));
            }

            if (isRick(character.name)) {
                setParty(state => ({
                    ...state,
                    [partyMembers.rick]: character,
                }));
            }
        },
        [],
    );

    return {
        party,
        pickMemberToParty,
    };
};

export const Party: FC<PartyProps> = ({ party }) => (
    <div className={css.root}>
        <div className={css.title}>Party</div>
        <div className={css.container}>
            <CharacterCard {...party[partyMembers.rick]} title={partyMembers.rick} />
            <CharacterCard {...party[partyMembers.morty]} title={partyMembers.morty} />
        </div>
    </div>
);
