import React from 'react'
import { Text, View, Picker, PickerIOS } from 'react-native'

export default PlabPicker = (props) => {
    const { title, selectedValue, onValueChange, data } = props
    return (
        <>
            {
                //<Text style={[styles.pickerTitle, { marginStart: 4 }]}>Quantidade: </Text>
            }
            <View style={[styles.pickerContainer, { width: 80 }]}>
                <Picker
                    selectedValue={selectedValue}
                    mode="dropdown"
                    style={styles.picker}
                    textStyle={{ fontSize: 14 }}
                    onValueChange={onValueChange}>
                    <Picker.Item label={title} value={-1} />
                    {data.map(item => {
                        <Picker.Item label={item.label} value={item.value} />
                    })}
                </Picker>
            </View>
        </>
    )
}