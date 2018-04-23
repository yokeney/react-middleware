import {createStore,applyMiddleware} from "./redux"
let counter=(state=0,action)=>{
	if (action) {
		switch (action.type) {
			case "ADD":
				return state+1;
			case 'DEL':
				return state-1;
			default:
			return state;

		}
	}
	else{
		return state;
	}
}
let thunk=store=>next=>action=>{
	if (typeof action==='function') {
		return action(next);
	}
	return next(action);
}
let logger=store=>next=>action=>{
	console.log("before",store.getState());
	console.log(store.getState());
	next(action);
	console.log("after",store.getState());
}
let store=applyMiddleware(thunk)(createStore)(counter)
store.subscribe(()=>{
	console.log(store.getState());
})
// store.dispatch({type:"ADD"})
store.dispatch((dispatch)=>{
	setTimeout(()=>{
		dispatch({type:"ADD"})
	},3000)
})
