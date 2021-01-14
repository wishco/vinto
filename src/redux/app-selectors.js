import {createSelector} from "reselect";
// список селекторов

// страница редиректа ----------------------------------------------
//------------------------------------------------------------------
export const getNavPagesUriStateSelector = (state) => {
  return state.app.navPagesUriState;
};
export const getNavPagesUriState = createSelector(getNavPagesUriStateSelector, (changer) => {
  return changer;
});
//------------------------------------------------------------------
