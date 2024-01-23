import React, {useState} from 'react';

import { Text, View, TouchableOpacity} from 'react-native';

const CustomSwitch = ({
  navigation,
  selectionMode,
  roundCorner,
  option1,
  option2,
  value, 
  setValue,
  onSelectSwitch,
  selectionColor
}) => {
  // const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  // console.log("🚀 ~ getSelectionMode:", getSelectionMode)
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);

  const updatedSwitchData = val => {
    console.log("🚀 ~ updatedSwitchData ~ val:", val)
    // setSelectionMode(val);
    setValue(val == 1 ? 'Yes' : 'No')
    // onSelectSwitch(val);
  };

  return (
    <View>
      <View
        style={{
          height: 25,
          width: 90,
          backgroundColor: 'white',
          borderRadius: getRoundCorner ? 25 : 0,
          borderWidth: 1,
          borderColor: selectionColor,
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 2,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={{
            flex: 1,

            backgroundColor: value == 1 ? selectionColor : 'white',
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: value == 1 ? 'white' : selectionColor,fontSize:9
            }}>
            {option1}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={{
            flex: 1,

            backgroundColor: value == 2 ? selectionColor : 'white',
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: value == 2 ? 'white' : selectionColor,fontSize:9
            }}>
            {option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomSwitch;