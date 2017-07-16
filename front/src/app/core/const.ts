export const BUCKET_COLORS = [
  { name: 'red', code: '#f44336'},
  { name: 'pink', code: '#e91e63'},
  { name: 'purple', code: '#9c27b0'},
  { name: 'blue', code: '#2196f3'},
  { name: 'cyan', code: '#00bcd4'},

  { name: 'green', code: '#4caf50'},
  { name: 'yellow', code: '#f1c40f'},
  { name: 'orange', code: '#ff9800'},
  { name: 'brown', code: '#795548'},
  { name: 'grey', code: '#9A9A9A'}
]

export function lightenColor(hex: string, lum: number) {
  // validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
};

export function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}
