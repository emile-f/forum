import * as moment from "moment";

export const convertDateToFromNow = (date) => {
  return moment(date).fromNow();
};

export const convertDate = (date) => {
  return moment(date).format("MMMM Do YYYY, h:mm:ss a");
};

export const getRandomBackgroundColor = (str) => {
  var saturation = 0;
  var hash = 0;

  for (var i = 0; i < str.length; i++) {
    const _charCode = str.charCodeAt(i);
    saturation = (saturation + _charCode) % 100;
    hash = _charCode + ((hash << 5) - hash);
  }

  var l = (saturation * saturation) % 100;
  console.log("test", saturation, l);

  var h = hash % 360;

  const style = {
    backgroundColor: "hsl(" + h + ", " + saturation + "%, " + l + "%)",
  };
  return style;
};
