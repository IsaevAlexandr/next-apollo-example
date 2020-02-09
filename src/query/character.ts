import gql from 'graphql-tag';
import { Character } from '../types';

export const CHARACTER_QUERY = gql`
    query fetchCharacters($name: String!) {
        characters(filter: { name: $name }) {
            results {
                name
                image
                id
            }
        }
    }
`;

export interface QueryCharacterVariables {
    name: string;
}

export interface CharacterResult {
    characters: {
        results: Character[];
    };
}
