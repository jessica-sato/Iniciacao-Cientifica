const COLORS = {
  white:   '#ffffff',
  black:   '#000000',
  green:   '#49F2CC',
  lightGrey: '#777',
  grey:    '#29363B',
  cyan:    'cyan',
  yellow:  '#FFE202',
  hotpink: 'deeppink',
};

const charSize = 33,
      leftStep = 22;

const CHAR_OPTS = {
  parent:       '#svgDiv',
  isForce3d:    true,
  fill:         COLORS.black,
  //radius:       {20: 40},
  radius:       charSize/2,
  stroke:       COLORS.grey,
  strokeWidth:  2,
}

console.log("Criando objetos");

function getChar(opts, char, x, y, randomOpts={})
{
  var char_shape = new mojs.Shape({
    ...opts,
    shape:        char,
    duration:     2000,
    isYoyo:       true,
    isShowStart:  true,
    easing:       'elastic.inout',
    repeat:       1,
    width:        200,
    height:       200,
    
    x:            x,
    y:            y,
    ...randomOpts,
  });

  return char_shape;
}

function getText(text, x, y, opts = CHAR_OPTS, xStep = 1.5*charSize, convertToUpper = true)
{
  if (convertToUpper)
    text = text.toUpperCase()

  shapes = [];
  cX = x;
  chars = text.split('');
  for (c of chars)
  {
    if (c === ' ')
    {
      cX += xStep;
      continue;
    }
    
    var rdnOpts = {}
    if (Math.random() < 0.5)
    {
      rdnOpts.radius = {};
      rdnOpts.radius[charSize/2] = charSize * 2/3;
    }
    if (c <= 9 && c >= 0)
      rdnOpts.fill = COLORS.white;
    
    var cShape = getChar(opts, c, cX, y, rdnOpts)
    shapes = shapes.concat(cShape);
    cX += xStep;
  }
  
  return shapes;
}

var timeline = new mojs.Timeline({repeat: 10});

function addText(text, timeline, x, y)
{
  var shapes = getText(text, x, y);

  for (s of shapes)
    timeline.add(s);
}

addText("a0z2", timeline, -75, -30);




moonBackground = new mojs.Shape({
//    ...CHAR_OPTS,
    shape:        'moon',
    radius:       {50: 60},
    duration:     2000,
    isYoyo:       true,
    isShowStart:  true,
    easing:       'elastic.inout',
    repeat:       1,
    width:        200,
    height:       200,
    
    x:            -50,
    y:            50,
    fill:         COLORS.hotpink,
  });

tmp = {}; tmp[COLORS.yellow] = COLORS.white;
moon = new mojs.Shape({
    ...CHAR_OPTS,
    parent:       moonBackground.el,
    shape:        'moon',
    radius:       {50: 53},
    duration:     2000,
    isYoyo:       true,
    isShowStart:  true,
    easing:       'elastic.inout',
    repeat:       1,
    width:        200,
    height:       200,
    
    x:            0,
    y:            0,
    fill:         tmp,
  });
  
timeline.add(moon);
timeline.add(moonBackground);

// teste com shield
a = {}; a[COLORS.green] = COLORS.hotpink;

shield = new mojs.Shape({
    ...CHAR_OPTS,
    shape:        'shield',
    radius:       {50: 53},
    duration:     2000,
    isYoyo:       true,
    isShowStart:  true,
    easing:       'elastic.inout',
    repeat:       true,
    width:        200,
    height:       200,
    
    x:            50,
    y:            50,
    fill:         a,
  });

timeline.add(shield);

// teste com sun
a = {}; a[COLORS.green] = COLORS.hotpink;

sun = new mojs.Shape({
    ...CHAR_OPTS,
    shape:        'sun',
    radius:       {50: 53},
    duration:     2000,
    isYoyo:       true,
    isShowStart:  true,
    easing:       'elastic.inout',
    repeat:       true,
    width:        200,
    height:       200,
    angle:        {0:45},
    x:            -50,
    y:            150,
    fill:         a,
  });

timeline.add(sun);


// teste com flask

a = {}; a[COLORS.green] = COLORS.white;
flask = new mojs.Shape({
    ...CHAR_OPTS,
    shape:        'flask',
    radius:       {50: 53},
    duration:     2000,
    isYoyo:       true,
    isShowStart:  true,
    easing:       'elastic.inout',
    repeat:       true,
    width:        200,
    height:       200,
    x:            50,
    y:            150,
    fill:         a,
  });

timeline.add(flask);

a = {}; a['transparent'] = COLORS.hotpink;
flaskBg = new mojs.Shape({
    shape:        'flask',
    radius:       {50: 0},
    duration:     2000,
    isYoyo:       true,
    isShowStart:  true,
    easing:       'elastic.inout',
    repeat:       true,
    width:        200,
    height:       200,
    x:            0,
    y:            {0: 20},
    fill:         a,
    parent:       flask.el,
  });
timeline.add(flaskBg);










timeline.play();


