import { transformToRows } from '../transformToRows';

describe('transformToRows', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8].map(id => ({ id }));

    it('should transform array correctly', async () => {
        expect(transformToRows({ data, elementsInRow: 3 })).toMatchInlineSnapshot(`
            Array [
              Array [
                Object {
                  "id": 1,
                },
                Object {
                  "id": 2,
                },
                Object {
                  "id": 3,
                },
              ],
              Array [
                Object {
                  "id": 4,
                },
                Object {
                  "id": 5,
                },
                Object {
                  "id": 6,
                },
              ],
              Array [
                Object {
                  "id": 7,
                },
                Object {
                  "id": 8,
                },
              ],
            ]
        `);
    });

    it('should transform array correctly considering ignoring elements', async () => {
        const ignore = { 3: true, 5: true, 8: true, 9: true };

        expect(transformToRows({ data, elementsInRow: 3, ignore })).toMatchInlineSnapshot(`
Array [
  Array [
    Object {
      "id": 1,
    },
    Object {
      "id": 2,
    },
    Object {
      "id": 4,
    },
  ],
  Array [
    Object {
      "id": 6,
    },
    Object {
      "id": 7,
    },
  ],
]
`);
    });
});
