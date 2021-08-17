export default function AdminReducer(state, action) {
  switch (action.type) {
    case "ADD_CANDIDATE":
      return {
        ...state,
        candidates: [...state.candidates, action.payload],
      };
    case "EDIT_CANDIDATE":
      const updatedCandidate = action.payload;
      const updatedCandidates = state.candidates.map((candidate) => {
        if (candidate.id === updatedCandidate.id) return updatedCandidate;
        return candidate;
      });

      return {
        ...state,
        candidates: updatedCandidates,
      };

    case "DELETE_CANDIDATE":
      return {
        ...state,
        candidates: state.candidates.filter(
          (candidate) => candidate.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
