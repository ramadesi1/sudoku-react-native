import React from 'react'
import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setName, getBoard } from '../store/actions'

function Home({ navigation }) {
  const dispatch = useDispatch()
  const name = useSelector((state) => state.game.name)
  const play = (level) => {
    dispatch(getBoard(level))
    navigation.navigate('Game')
  }

  const onHandleNameChange = (text) => {
    dispatch(setName(text))
  }

  return (
    <View
      style={{
        backgroundColor: '#EABCAC',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={styles.title}>Sudoku Game!</Text>
      <Text style={styles.subtitle}>Enter your name: </Text>
      <TextInput
        style={styles.text}
        onChangeText={(text) => onHandleNameChange(text)}
        value={name}
      />
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button color="green" title="Easy!" onPress={() => play('easy')} />
        </View>
        <View style={styles.button}>
          <Button title="Medium!" onPress={() => play('medium')} />
        </View>

        <View style={styles.button}>
          <Button color="red" title="Hard!" onPress={() => play('hard')} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  subtitle: {
    fontSize: 20
  },
  text: {
    padding: 10,
    width: 200,
    height: 40,
    borderWidth: 1,
    margin: 20,
  },
  buttons: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  button: {
    margin: 20,
  },
})

export default Home
