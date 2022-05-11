// we define a 'polyfill' BigInt so we can support Firefox 62 and above instead of 68+
try {
  BigInt(1);
  Remainder = (a, b) => { return a % b };
  Add = (a, b) => { return a + b };
} catch (e) {
  BigInt = JSBI.BigInt;
  Remainder = JSBI.remainder;
  Add = JSBI.ADD;
}



const COLORS = {
  white: '#ffffff',
  black: '#000000',
  green: '#49F2CC',
  lightGrey: '#ddd',
  grey: '#29363B',
  cyan: 'cyan',
  yellow: '#FFE202',
  hotpink: 'deeppink',
};

function getChar(opts, char, x, y, randomOpts = {}) {
  var char_shape = new mojs.Shape({
    ...opts,
    ...getStdOpts(char, opts.baseCharSize),

    x: x,
    y: y,
    ...randomOpts,
  });

  return char_shape;
}

function getText(text, x, y, baseOptions) {
  let charSize = baseOptions.baseCharSize;

  let opts = { ...baseOptions };
  xStep = opts.xTxtSpacing;
  shapes = [];
  cX = x;
  chars = text.split('');
  for (c of chars) {
    if (c === ' ') {
      cX += xStep;
      continue;
    }

    opts.radius = charSize;

    var rdnOpts = {}
    if (opts.animate) {
      rdnOpts.radius = {};
      rdnOpts.radius[charSize] = charSize * 1.1; // {charSize: charSize*1.1}
    }
    if (c <= 9 && c >= 0)
      rdnOpts.fill = COLORS.white;

    var cShape = getChar(opts, c, cX, y, rdnOpts)
    shapes = shapes.concat(cShape);
    cX += xStep;
  }

  return shapes;
}

function addText(text, timeline, x, y, options) {
  var shapes = getText(text, x, y, options);

  for (s of shapes)
    timeline.add(s);
}

AVAILABLE_CHARS = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'J',
  'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'W',
  'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

let defaultBaseCharSize = 25;
let defaultBaseIconSize = 50;
DEFAULT_OPTS = {
  x: 0,
  y: 0,
  yTxtSpacing: 2.3 * defaultBaseCharSize,
  xTxtSpacing: 2.3 * defaultBaseCharSize,
  baseCharSize: defaultBaseCharSize,
  baseIconSize: defaultBaseIconSize,
  iconCharSpacing: 1 + Math.max(defaultBaseIconSize, defaultBaseCharSize) - Math.min(defaultBaseIconSize, defaultBaseCharSize),
  yIconSpacing: 2.3 * defaultBaseIconSize,
  xIconSpacing: 2.3 * defaultBaseIconSize,
  icon_generators: ICON_GENERATORS,
  extraNumbersGenerated: 16,
  masks: {
    animate: true,
    thinLine: true,
    movingLine: true
  }
}

class hashify {
  constructor(generator) {
    this.generator = generator();
  }

  /**
   * Defines an object with a hashing generator. Example: hashify.seed("1212")
   * @param {string} hash Hex string of the starting hash
   * @param {string} salt Text of the salt
   * @param {string} hashalg SHA variant. Valid options: "SHA-1", "SHA-256", "SHA-512"
   */
  static seed(hash, salt = "", hashalg = "SHA-256") {
    var sha_gen = function* () {
      var saltHasher = new jsSHA(
        hashalg,
        "TEXT"
      );
      saltHasher.update(salt);
      let saltHex = saltHasher.getHash("HEX");

      var hashObj = new jsSHA(
        hashalg,
        "HEX"
      );

      // we set the initial state
      //hashObj.update(hash);
      let current_state = hash;
      while (true) {

        var hashObj = new jsSHA(
          hashalg,
          "HEX"
        );
        hashObj.update(current_state + saltHex);
        current_state = hashObj.getHash("HEX");

        yield BigInt("0x" + current_state);
      }
    }

    return new hashify(sha_gen);
  }

  /**
   * Generates an object with a custom generator. Example: hashify.custom([1,2,3])
   * @param {Array} custom_values Array of integers or BigIntegers
   * @param {boolean} cycle If true, repeat the values upon reaching the end
   */
  static custom(custom_values, cycle = true) {
    var custom_gen = function* () {
      var internal_vals = custom_values;
      let i = 0;
      while (i < internal_vals.length) {
        yield internal_vals[i];
        i++;

        if (i >= internal_vals.length) {
          if (cycle)
            i = 0;
          else
            return;
        }
      }
    }

    return new hashify(custom_gen);
  }

  /**
   * Generates an animations in the parent element
   * @param {Array} letters_grid Define the size grid of letters
   * @param {Array} images_grid Define the size of the grid of images
   * @param {string} parent Id of parent element
   * @param {Object} options Customizable options, like position
   */
  prepAnimation(parent, letters_grid = [1, 4], images_grid = [2, 2], options = DEFAULT_OPTS) {
    // Verifying that everything whe need is ok
    try {
      BigInt(1);
    } catch (e) {
      throw "BigInt support is needed";
    }

    // We clean the element
    $(parent).empty();

    // We create a new timeline
    var timeline = this.getNewTimeline(options);

    let availableIcons = Object.keys(options.icon_generators);
    let optsWithParent = { ...options, parent: parent };

    // We move the first icons back a bit, to better center the whole hash seal
    let deltaY = -1 * ((
      (letters_grid[0] - 1) * options.yTxtSpacing + options.baseCharSize +
      (images_grid[0] - 1) * options.yIconSpacing + options.baseIconSize +
      options.iconCharSpacing
    ) / 2);

    // Generating the letters
    const availableCharsLength = BigInt(AVAILABLE_CHARS.length);
    for (var i = 0; i < letters_grid[0]; i++) {
      let deltaX = -1 * (letters_grid[1] - 1) * options.xTxtSpacing / 2; // center this char line

      for (var j = 0; j < letters_grid[1]; j++) {
        let n = Remainder(this.generator.next().value, availableCharsLength);
        addText(AVAILABLE_CHARS[n], timeline, options.x + deltaX, options.y + deltaY,
          {
            ...optsWithParent,
            ...this.getRandomLetterOptions(options.extraNumbersGenerated, options.masks)
          });

        deltaX += options.xTxtSpacing;
      }

      deltaY += options.yTxtSpacing;
    }

    // There needs to be a bit of separation between the letters and icons
    deltaY += options.iconCharSpacing;

    // Generating the icons
    let availableIconsLength = BigInt(availableIcons.length);
    for (var i = 0; i < images_grid[0]; i++) {
      let deltaX = -1 * (images_grid[1] - 1) * options.xIconSpacing / 2; // center this icon line

      for (var j = 0; j < images_grid[1]; j++) {
        // Select a value from the generator and take the modulo of the available icons
        let n = Remainder(this.generator.next().value, availableIconsLength);

        // Generate all "random" options
        let rdn_opts = this.getRandomIconOptions(options.extraNumbersGenerated, options.masks);

        // Select the generator function
        let icon_generator = options.icon_generators[availableIcons[n]];

        // Calling the function that creates the icon in the new position
        icon_generator(timeline, options.x + deltaX, options.y + deltaY,
          { ...optsWithParent, ...rdn_opts });

        deltaX += options.xIconSpacing;
      }

      deltaY += options.yIconSpacing;
    }

    this.timeline = timeline;
  }

  animate() {
    this.timeline.play();
  }

  getRandomLetterOptions(generatorSpacing, masks) {
    var rdnBaseNumbers = Array
      .from(Array(generatorSpacing))
      .map(() => this.generator.next().value);

    return {};
  }

  getRandomIconOptions(generatorSpacing, masks) {
    var rdnBaseNumbers = Array
      .from(Array(generatorSpacing))
      .map(() => this.generator.next().value);
    let animateBool = masks.animate && Remainder(rdnBaseNumbers[0], BigInt(2)) == 0;
    let thinLineBool = masks.thinLine && Remainder(rdnBaseNumbers[1], BigInt(2)) == 0;
    let movingLineBool = masks.movingLine && Remainder(rdnBaseNumbers[2], BigInt(2)) == 0;
    let dashArrayOffset = masks.movingLine && Add(Remainder(rdnBaseNumbers[2], BigInt(100)), BigInt(100));

    let rdn_opts = {
      animate: animateBool, thinLine: thinLineBool,
      movingLine: movingLineBool, customDashArrayOffset: dashArrayOffset
    };
    return rdn_opts;
  }

  getNewTimeline(options) {
    if (options.loop == 0) {
      var timeline = new mojs.Timeline({
        onComplete() {
          this.replay(0); // create an infinite loop
        }
      });
    }
    else {
      var timeline = new mojs.Timeline();
    }
    return timeline;
  }
}

//a = hashify.seed("121213").animate("#svgDiv", letters_grid = [2, 5], images_grid = [5, 5]);
//a = hashify.seed("121213").animate("#svgDiv");
