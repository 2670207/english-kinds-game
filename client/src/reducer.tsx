 
function reducer(state = {isModeGameTraining: true}, action: any){
    console.log(action);
    switch (action.type) {
        case "game.mode.training":
            return {
                isModeGameTraining: true
            };
        case "game.mode.play":
            return {
                isModeGameTraining: false
            };
        default:
        return state;
    }
    }
 
export default reducer;