const { expect } = require('chai');
const { Gradiant, RGBColour } = require('../build');

class GradiantTest extends Gradiant {
}

describe('Gradiant', () => {
  const gradiant = new GradiantTest();

  describe('Gradiant#addStopColour', () => {
    it('should add a stop colour', () => {
      const stopColour = {
        offset: 0.3,
        colour: new RGBColour()
      };

      gradiant.addStopColour(stopColour);

      expect(gradiant.getStopColours()[0]).to.equal(stopColour);
    });

    it('should clamp the stop value', () => {
      gradiant.addStopColour({
        offset: 2,
        colour: new RGBColour()
      });

      gradiant.addStopColour({
        offset: -45,
        colour: new RGBColour()
      });

      expect(gradiant.getStopColours()[1].offset).to.equal(1);
      expect(gradiant.getStopColours()[2].offset).to.equal(0);
    });
  });
});
