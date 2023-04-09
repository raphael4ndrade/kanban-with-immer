
describe('value vs reference', () => {
  test('should compare values', () => {
    const a = 10
    const b = 10
    const c = 30

    expect(a).toBe(b)
    expect(a).toEqual(b)
    expect(a).not.toEqual(c)
  })

  test('should compare references', () => {
    const a = { name: 'Jose' }
    const b = { name: 'Jose' }
    const referenceOfA = a

    expect(a).toBe(referenceOfA)
    expect(a).not.toBe(b)
    expect(a).not.toBe({ name: 'Jose'})
    expect(a).toEqual(b)
  })
})