import { funcOriginal, funcRefactoring } from './task';

it('test empty string', () => {
    expect(funcOriginal("",1,2)).toEqual(-1);
    expect(funcRefactoring("",1,2)).toEqual(-1);
});

describe("test 1 length", () => {
    it('string accept a', () => {
        expect(funcOriginal("1",1,2)).toEqual(-1);
        expect(funcRefactoring("1",1,2)).toEqual(-1);
    });

    it('string accept b', () => {
        expect(funcOriginal("1",2,1)).toEqual(-1);
        expect(funcRefactoring("1",2,1)).toEqual(-1);
    });

    it('string accept a and b', () => {
        expect(funcOriginal("1",1,1)).toEqual(-1);
        expect(funcRefactoring("1",1,1)).toEqual(-1);
    });

    it('string not accept', () => {
        expect(funcOriginal("1",2,2)).toEqual(-1);
        expect(funcRefactoring("1",2,2)).toEqual(-1);
    });
});

describe('test 2 length', () => {
    it('string accept a', () => {
        expect(funcOriginal("12",1,2)).toEqual(1);
        expect(funcOriginal("11",1,2)).toEqual(1);
        expect(funcRefactoring("12",1,2)).toEqual(1);
        expect(funcRefactoring("11",1,2)).toEqual(1);
    });

    it('string accept b', () => {
        expect(funcOriginal("02",1,2)).toEqual(1);
        expect(funcRefactoring("02",1,2)).toEqual(1);
    });

    it('string accept a and b', () => {
        expect(funcOriginal("11",1,1)).toEqual(1);
        expect(funcRefactoring("11",1,1)).toEqual(1);
    });

    it('string not accept', () => {
        expect(funcOriginal("11",2,2)).toEqual(-1);
        expect(funcRefactoring("11",2,2)).toEqual(-1);
    });
});

describe('test more 2 length', () => {
    it('string accept a', () => {
        expect(funcOriginal("123456",4,7)).toEqual(3);
        expect(funcRefactoring("123456",4,7)).toEqual(3);
    });

    it('string accept b', () => {
        expect(funcOriginal("123456",4,6)).toEqual(5);
        expect(funcRefactoring("123456",4,6)).toEqual(5);
    });

    it('string accept a and b', () => {
        expect(funcOriginal("123456",3,3)).toEqual(2);
        expect(funcRefactoring("123456",3,3)).toEqual(2);
    });

    it('string not accept', () => {
        expect(funcOriginal("123456",7,0)).toEqual(-1);
        expect(funcRefactoring("123456",7,0)).toEqual(-1);
    });
});

describe('last found', () => {
    it('last found element a', () => {
        expect(funcOriginal("12345654321",2,0)).toEqual(9);
        expect(funcRefactoring("12345654321",2,0)).toEqual(9);
    });

    it('last found element b', () => {
        expect(funcOriginal("12345654321",0,4)).toEqual(7);
        expect(funcRefactoring("12345654321",0,4)).toEqual(7);
    });

    it('last found element a and b', () => {
        expect(funcOriginal("12345654321",2,4)).toEqual(9);
        expect(funcRefactoring("12345654321",2,4)).toEqual(9);
    });
});
