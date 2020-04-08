import {
  SET_BOARD,
  SET_NAME,
  CHANGE_BOARD,
  SET_STATUS,
  SOLVE_BOARD,
  RESET_GAME,
} from '../actions/action-types'

const initialState = {
  board: [[]],
  newBoard: [[]],
  name: '',
  status: '',
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_BOARD: {
      return {
        ...state,
        board: action.payload.board,
        newBoard: action.payload.newBoard,
      }
    }
    case SET_NAME: {
      return { ...state, name: action.payload }
    }
    case CHANGE_BOARD: {
      return { ...state, newBoard: action.payload }
    }
    case SET_STATUS: {
      return { ...state, status: action.payload }
    }
    case SOLVE_BOARD: {
      return { ...state, newBoard: action.payload }
    }
    case RESET_GAME: {
      return { ...state, board: [[]], newBoard: [[]], name: '', status: '' }
    }
  }
  return state
}
