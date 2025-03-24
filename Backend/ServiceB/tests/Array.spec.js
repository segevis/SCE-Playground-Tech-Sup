import { expect } from "chai";

describe("Stam tests suite", ()=>{
    describe("Test array get sorted", ()=> {
        it('Should sort array by name', ()=>{
            const names = ['Adiel', 'Tom', 'John']
            expect(names.sort()).to.be.eql(['Adiel', 'John', 'Tom']);
        })
    })
})