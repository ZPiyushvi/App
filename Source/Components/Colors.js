const commonColor = {
  colors: {
    //   primary: "#292865",
    secondary: "#695F9B",
    shadowColor: "#130B4D",
    black: "#000000",
  },
};

const light = {
  colors: {
    themeColor: "#FFFFFF",
    text: "#130B4D",
    ...commonColor.colors,
  },
};

const dark = {
  colors: {
    backGroundColor: "#1C1C1E",
    fond_iconColor: "#E7E1E6",

    primaryColor: "#4A4356",

    primaryColor_Shade0: "#29272d",
    primaryColor_Shade1: "#3e3c42",
    primaryColor_Shade2: "#535256",
    primaryColor_Shade3: "#69676c",
    primaryColor_Shade4: "#7e7d81",
    primaryColor_Shade5: "#949396",
    primaryColor_Shade6: "#a9a8ab",
    primaryColor_Shade7: "#bebec0",
    primaryColor_Shade8: "#d4d3d5",
    primaryColor_Shade9: "#e9e9ea",
    primaryColor_Shade10: "#ffffff",


    fond_iconInsidePrimaryColor: "#E8DDF9",



    themeColor: "#130B4D",
    text: "#FFFFFF",
    ...commonColor.colors,
  },
};

export default { light, dark };

// #29272d
// #3e3c42
// #535256
// #69676c
// #7e7d81
// #949396
// #a9a8ab
// #bebec0
// #d4d3d5
// #e9e9ea
// #ffffff