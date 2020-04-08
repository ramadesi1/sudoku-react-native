import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { changeBoard, solveBoard, validateBoard } from '../store/actions'

export function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
  return update
}

function Game({ navigation }) {
  const forceUpdate = useForceUpdate()
  const [showButton, setShowButton] = useState(false)
  const [selected, setSelected] = useState({ active: false, row: 0, col: 0 })
  const dispatch = useDispatch()
  const newBoard = useSelector((state) => state.game.newBoard)
  const board = useSelector((state) => state.game.board)
  const status = useSelector((state) => state.game.status)

  const onBoardClick = (i, j, val) => {
    if (val !== 'x') {
      setShowButton(true)
      const data = {
        row: i,
        col: j,
        active: true,
      }
      setSelected(data)
    }
  }

  const setBoard = (number) => {
    let newData = newBoard
    newData[selected.row][selected.col] = number
    dispatch(changeBoard(newData))
    setSelected({ ...selected, active: false })
    setShowButton(false)
    forceUpdate()
  }
  const giveUp = () => {
    dispatch(solveBoard(board))
  }
  const validate = () => {
    dispatch(validateBoard(newBoard))
    if (status === 'solved') {
      navigation.navigate('Finish')
    }
  }

  useEffect(() => {
    if (status === 'solved') {
      navigation.navigate('Finish')
    }
  }, [status])
  return (
    <View
      style={{
        backgroundColor: '#EABCAC',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Text style={styles.header}>Let's Play!</Text>
      <Text style={styles.status}>Status: {status ? status : 'unsolved'}</Text>
      {board.map((row, i) => (
        <View style={styles.board} key={i}>
          {row.map((col, j) => (
            <TouchableOpacity
              style={col === 'x' ? styles.dark : styles.light}
              onPress={() => onBoardClick(i, j, col)}
              key={j}
            >
              <Text
                style={
                  selected.row === i && selected.col === j && selected.active
                    ? styles.selected
                    : null
                }
              >
                {newBoard[i][j]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {showButton ? (
        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button color="#36384C" title="1" onPress={() => setBoard(1)} />
          </View>
          <View style={styles.button}>
            <Button color="#849974" title="2" onPress={() => setBoard(2)} />
          </View>
          <View style={styles.button}>
            <Button color="#613A43" title="3" onPress={() => setBoard(3)} />
          </View>
          <View style={styles.button}>
            <Button color="#726A95" title="4" onPress={() => setBoard(4)} />
          </View>
          <View style={styles.button}>
            <Button color="#709FB0" title="5" onPress={() => setBoard(5)} />
          </View>
          <View style={styles.button}>
            <Button color="#FF7E5F" title="6" onPress={() => setBoard(6)} />
          </View>
          <View style={styles.button}>
            <Button color="#E25F70" title="7" onPress={() => setBoard(7)} />
          </View>
          <View style={styles.button}>
            <Button color="#6CBF84" title="8" onPress={() => setBoard(8)} />
          </View>
          <View style={styles.button}>
            <Button color="#D1A827" title="9" onPress={() => setBoard(9)} />
          </View>
        </View>
      ) : null}

      <View style={styles.buttons}>
        <View style={styles.buttonEnd}>
          <Button color="green" title="Validate!" onPress={() => validate()} />
        </View>
        <View style={styles.buttonEnd}>
          <Button color="red" title="Give up!" onPress={() => giveUp()} />
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  board: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  light: {
    alignItems: 'center',
    padding: 10,
    height: 40,
    width: 40,
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderWidth: 1,
  },
  dark: {
    alignItems: 'center',
    padding: 10,
    height: 40,
    width: 40,
    backgroundColor: 'orange',
    borderColor: '#000000',
    borderWidth: 1,
  },
  buttons: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  selected: {
    color: 'green',
  },
  button: {
    margin: 5,
    width: 30,
  },
  buttonEnd: {
    margin: 5,
  },
  header: {
    margin: 10,
    fontSize: 40,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 20,
    marginBottom: 10,
  },
})
export default Game
