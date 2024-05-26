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
        fond_iconInsidePrimaryColor: "#E8DDF9",



      themeColor: "#130B4D",
      text: "#FFFFFF",
      ...commonColor.colors,
    },
  };
  
  export default { light, dark };