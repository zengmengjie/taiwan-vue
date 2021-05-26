/**
 * Created by lynnnnnnnn on 2017/4/1.
 */
import * as types from '../types'

export default {
    updateTitle ({commit}, title) {
        commit(types.TITLE, title)
    }
}
