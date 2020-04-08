import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { resetGame } from '../store/actions'

function Finish({ navigation }) {
  const name = useSelector((state) => state.game.name)
  const dispatch = useDispatch()
  const restart = () => {
    dispatch(resetGame())
    navigation.navigate('Home')
  }

  return (
    <View
      style={{
        backgroundColor: '#EABCAC',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Text style={styles.title}>Congrats {name}!</Text>
      <Text style={styles.subtitle}>You have been finished the game!</Text>
      <View style={styles.button}>
        <Button color="green" title="Restart!" onPress={() => restart()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    marginBottom: 50
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 50
  },
  button: {
    margin: 50
  }
})

export default Finish
