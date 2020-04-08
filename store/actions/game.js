import {
  SET_BOARD,
  SET_NAME,
  CHANGE_BOARD,
  SET_STATUS,
  SOLVE_BOARD,
  RESET_GAME,
} from './action-types'
import axios from 'axios'

const baseURL = 'https://sugoku2.herokuapp.com'

const encodeBoard = (board) =>
  board.reduce(
    (result, row, i) =>
      result +
      `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`,
    ''
  )

const encodeParams = (params) =>
  Object.keys(params)
    .map((key) => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&')

export const setBoard = (value) => ({
  type: SET_BOARD,
  payload: value,
})

export const setName = (value) => ({
  type: SET_NAME,
  payload: value,
})

export const changeBoard = (value) => ({
  type: CHANGE_BOARD,
  payload: value,
})

export const setStatus = (value) => ({
  type: SET_STATUS,
  payload: value,
})

export const setSolveBoard = (value) => ({
  type: SOLVE_BOARD,
  payload: value,
})

export const resetGame = (value) => ({
  type: RESET_GAME,
  payload: value,
})

export function getBoard(difficulty) {
  return function (dispatch) {
    axios
      .get(`${baseURL}/board?difficulty=${difficulty}`)
      .then(({ data }) => {
        const board = data.board.map(function (row) {
          return row.map(function (col) {
            return col === 0 ? 0 : 'x'
          })
        })

        const boards = {
          board,
          newBoard: data.board,
        }

        dispatch(setBoard(boards))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export function solveBoard(board) {
  return function (dispatch) {
    board = board.map(function (row) {
      return row.map(function (col) {
        return col === 'x' ? 0 : col
      })
    })
    const data = { board }
    axios
      .post(`${baseURL}/solve`, encodeParams(data))
      .then(({ data }) => {
        dispatch(setSolveBoard(data.solution))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export function validateBoard(board) {
  return function (dispatch) {
    const data = { board }
    axios
      .post(`${baseURL}/validate`, encodeParams(data))
      .then(({ data }) => {
        dispatch(setStatus(data.status))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
