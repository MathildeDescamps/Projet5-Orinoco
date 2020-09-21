// Exemple de code de test unitaire, en utilisant le framework Jest.
const cleanCart = require('./Cart');
test('Test function clean cart', () => {
    expect(cleanCart()).toStrictEqual([]);
});