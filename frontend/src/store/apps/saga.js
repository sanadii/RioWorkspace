// @flow
import { all, call, fork, takeEvery } from "redux-saga/effects";

import {
    CHANGE_ACTIVE_APP,
} from './actionType';

/**
 * Changes the body attribute
 */
function changeHTMLAttribute(attribute, value) {
    if (document.documentElement) document.documentElement.setAttribute(attribute, value);
    return true;
}

/**
 * Changes the layout type
 * @param {*} param0
 */
function* changeActiveApp({ payload: app }) {
    try {
        if (app === "twocolumn") {
            document.documentElement.removeAttribute("data-layout-width");
        } else if (app === "horizontal") {
            document.documentElement.removeAttribute("data-sidebar-size");
        }
        yield call(changeHTMLAttribute, "data-layout", app);
    } catch (error) {
        // console.log(error);
    }
}


/**
 * Watchers
 */
export function* watchChangeActiveApp() {
    yield takeEvery(CHANGE_ACTIVE_APP, changeActiveApp);
}


function* AppsSaga() {
    yield all([
        fork(watchChangeActiveApp),
    ]);
}

export default AppsSaga;

