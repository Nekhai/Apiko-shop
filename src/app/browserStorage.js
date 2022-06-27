const KEY = "redux";
export function loadState() {
  try {
    const serializedState = sessionStorage.getItem(KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
}

export async function saveState(state) {
  try {
    const serializedState = JSON.stringify({
      login: state.login,
      cart: state.cart,
    });
    sessionStorage.setItem(KEY, serializedState);
  } catch (error) {}
}
