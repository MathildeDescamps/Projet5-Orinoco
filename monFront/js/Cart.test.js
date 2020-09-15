const cleanCart = require('./Cart');
test('Test function clean cart', () => {
    expect(cleanCart()).toStrictEqual([]);
});