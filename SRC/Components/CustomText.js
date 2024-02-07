import React from "react";
import { Text } from "react-native";
import Color from "../Assets/Utilities/Color";

const CustomText = (props) => {
  const { children, numberOfLines, style, isBold, onPress,} = props;
  return (
    <Text
      onPress={onPress}
      style={[
        {
          textTransform: "capitalize",
          // textAlign:'center',
          // textTransform: "capitalize",
          color: Color.black,
        },
        style,
        { fontFamily: "PlusJakartaDisplay-Regular" },
        isBold && {
          fontFamily: "PlusJakartaDisplay-Bold",
          fontWeight: "bold",
          color: Color.black,
        },
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

export default CustomText;