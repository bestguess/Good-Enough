import * as types from '../constants/ActionTypes'

export function answerQuestion(answer) {
	if (answer !== undefined) answer = "MakerSquare"
	return { type: types.ANSWER_QUESTION, answer }
}