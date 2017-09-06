(function () {
  console.log('document is ready');

  // Set some constants
  const RED = 'red',
        GREEN = 'green',
        BLUE = 'blue',
        ALPHA = 'alpha',
        MIXED = 'mixed';
  const constantsArray = [RED,GREEN,BLUE,ALPHA,MIXED];

  // Get a hold of the div boxes with the respective colors
  const boxDivs = constantsArray.reduce((o,c) => {
    o[c] = getDivElement(c);
    return o;
  }, {});

  // Get a hold of the input ranges
  const ranges = constantsArray.reduce((o,c) => {
    o[c] = getInputRangeElement(c);
    return o;
  }, {});

  // Add event listeners for input changes
  Object.keys(ranges).forEach(r => {
    ranges[r] ? ranges[r].addEventListener('input', handleRangeInputChange) : null;
  });

  // HELPERS \\
  function getDivElement(color) {
    return document.getElementsByClassName(color)[0] || null;
  }

  function getInputRangeElement(color) {
    return document.getElementById(color) || null;
  }

  function handleRangeInputChange(e) {
    e.stopPropagation();
    e.preventDefault();
    let {id, value} = e.target;

    setCSSVariable(id,value);
    setValueInView(id,value);
  }

  // Set style of the boxes
  function setCSSVariable(colorId, value) {
    document.documentElement.style.setProperty(`--${colorId}`, +value);
  }

  // Set value in the view
  function setValueInView(colorId, value) {
    boxDivs[colorId].getElementsByClassName('value')[0].innerText = value;
  }
})()