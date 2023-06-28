//import classNames from 'classnames';

const percentRegex = /^\d+(\.\d+)?%$/;

export const getColor = (value) => {
  if (percentRegex.test(value)) {
    const percentage = parseFloat(value);
    if (percentage > 100 || value <= 150)
      return {
        backgroundColor: "white",
        color: "#008000",
        fontWeight: "bold",
      };
    else return { backgroundColor: "white", color: "red", fontWeight: "bold" };
  }
  return { backgroundColor: "white" };
};

export const getColorWos = (value) => {
  if (value <= 5) return { backgroundColor: "pink", color: "red", fontWeight: "bold" };
  if (value >= 8)
    return { backgroundColor: "#ffc000", color: "red", fontWeight: "bold" };
  return { backgroundColor: "#B5B2B2" };
};
export const getColor2WosMeasure = (value) => {
  if (value <= 4) return { backgroundColor: "pink", color: "red" };
  if (value >= 8) return { backgroundColor: "#ffc000", color: "red" };
  return { backgroundColor: "white" };
};

export const getColorWhite = (value) => {
  if (value === true) return { backgroundColor: "white" };
  return { backgroundColor: "white" };
};
export const getColor4 = (value) => {
  if (value === true) return { backgroundColor: "white" };
  return { backgroundColor: "white" };
};

export const getColor5 = (value) => {
  if (value <= 10) return { backgroundColor: "brown", color: "green" };
  if (value >= 18) return { color: "red" };
  if (value >= 75) return { backgroundColor: "yellow" };
  if (value <= 100) return { backgroundColor: "green", color: "yellow" };
  return { backgroundColor: "green" };
};

export const getColorsWhite = (value) => {
  if (value === true) return { backgroundColor: "white" };
  return { backgroundColor: "white" };
};

export const getColorsS = (value) => {
  // if (value = true) return { backgroundColor: "#d9d9d9",color:'purple',fontWeight: "bold" };
  if (value = true) return { backgroundColor: "#d9d9d9"};
  return { backgroundColor: "#d9d9d9"};
};

export const getColorsUSD = (value) => {
  if (value === true) return { backgroundColor: "#e2efda" };
  return { backgroundColor: "#e2efda" };
};

export const getColorsCOP = (value) => {
  if (value === true) return { backgroundColor: "#fce4d6" };
  return { backgroundColor: "#fce4d6" };
};

export const getColorGPT = (value) => {
  if (Math.abs(value) >= 100 && Math.abs(value) <= 130) {
    return { backgroundColor: "#fff2cc", color: "green" };
  }
  if (Math.abs(value) >= 80 && Math.abs(value) <= 99) {
    return { color: "red" };
  }
  if (value >= -8 && value <= -4) {
    return { backgroundColor: "#fff2cc", color: "red" };
  }
  if (value >= -16.6 && value < -8) {
    return { backgroundColor: "#fff2cc", color: "red" };
  }
  if (percentRegex.test(value)) {
    const percentage = parseFloat(value);
    if (percentage > 100 || Math.abs(value) <= 150) {
      return {
        backgroundColor: "#fff2cc",
        color: "#008000",
        fontWeight: "bold",
      };
    } else {
      return { backgroundColor: "#fff2cc", color: "red", fontWeight: "bold" };
    }
  }
  return { backgroundColor: "#fff2cc" };
};

export const getColorPercentCOP = (value) => {
  if (Math.abs(value) >= 100 && Math.abs(value) <= 130) {
    return { backgroundColor: "#fce4d6", color: "green" };
  }
  if (Math.abs(value) >= 80 && Math.abs(value) <= 99) {
    return { color: "red" };
  }
  if (value >= -8 && value <= -4) {
    return { backgroundColor: "#fce4d6", color: "red" };
  }
  if (value >= -16.6 && value < -8) {
    return { backgroundColor: "#fce4d6", color: "red" };
  }
  if (percentRegex.test(value)) {
    const percentage = parseFloat(value);
    if (percentage > 100 || Math.abs(value) <= 150) {
      return {
        backgroundColor: "#fce4d6",
        color: "#008000",
        fontWeight: "bold",
      };
    } else {
      return { backgroundColor: "#fce4d6", color: "red", fontWeight: "bold" };
    }
  }
  return { backgroundColor: "#fce4d6" };
};

export const getColorPercentUSD = (value) => {
  if (percentRegex.test(value)) {
    const percentage = parseFloat(value);
    if (percentage >= 100) {
      return {
        backgroundColor: "#e2efda",
        color: "#008000",
        fontWeight: "bold",
      };
    } else {
      return { backgroundColor: "#e2efda", color: "red", fontWeight: "bold" };
    }
  }
  return { backgroundColor: "#e2efda" };
};

export const getColorPercentWhite = (value) => {
  if (percentRegex.test(value)) {
    const percentage = parseFloat(value);
    if (percentage >= 100) {
      return { backgroundColor: "white", color: "#008000", fontWeight: "bold" };
    } else {
      return { backgroundColor: "white", color: "red", fontWeight: "bold" };
    }
  }
  return { backgroundColor: "white" };
};

export const getColorResoForc = (value) => {
  if (typeof value === "string") {

    if (value === "Result") {
      return{
        backgroundColor: "#c6efce", color: "green",
      }
      
    } else if(value === "FCST") {
      
    }
    return{
      backgroundColor: "#ffc7ce", color: "red"

    }
    
    } else {
      return { backgroundColor: "white", color: "pink"};
    }
  }
