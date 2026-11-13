// Selected original pure functions from Hexahedral util.js, Matthew Miner, MIT.
// Browser/audio/dev helpers omitted; no Redux dependency is needed.
export function createReducer(initialState,handlers={}){return(state=initialState,action)=>{const handler=handlers[action.type];if(!handler)return state;return handler(state,action);};}
export function findDistance(position1,position2){const rowDistance=Math.abs(position1.row-position2.row);const columnDistance=Math.abs(position1.column-position2.column);return rowDistance+columnDistance;}
