const { expect } = require('chai');
const { RGBColour } = require('../build');

describe('RGBColour', () => {
  const colour = new RGBColour();

  describe('RGBColour#setRed, #setGreen, #setBlue, #setAlpha', () => {
    it('should set the right colour value', () => {
      colour.setRed(150);
      colour.setGreen(120);
      colour.setBlue(25);
      colour.setAlpha(0.4);

      expect(colour.toRGBAString()).to.equal('rgba(150, 120, 25, 0.4)');
    });

    it('should clamp the colour value', () => {
      colour.setRed(500);
      colour.setGreen(-785);

      expect(colour.getRed()).to.equal(255);
      expect(colour.getGreen()).to.equal(0);
    });

    it('should clamp the alpha value', () => {
      colour.setAlpha(-4);

      expect(colour.getAlpha()).to.equal(0);

      colour.setAlpha(2);

      expect(colour.getAlpha()).to.equal(1);
    });
  });
});
