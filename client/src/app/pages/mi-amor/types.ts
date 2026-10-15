export type CandyKind = 'berry' | 'cherry' | 'grape' | 'orange' | 'lemon' | 'blueberry';
export type SpecialCandy = 'striped-h' | 'striped-v' | 'wrapped' | 'color-bomb';
export type Candy = { id: number; kind: CandyKind; special?: SpecialCandy };
export type Board = (Candy | null)[];
