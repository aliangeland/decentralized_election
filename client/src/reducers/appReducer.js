export default function appReducer(state, action) {
  switch (action.type) {
    case "SET_CONTRACT":
      return {
        ...state,
        contract: action.payload,
      };
    case "SET_ACCOUNT":
      return { ...state, account: action.payload };
    case "SET_VOTED":
      return { ...state, isVoted: action.payload };
    default:
      return state;
  }
}
