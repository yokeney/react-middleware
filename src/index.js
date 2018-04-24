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
// let thunk=store=>next=>action=>{
// 	if (typeof action==='function') {
// 		return action(next);
// 	}
// 	return next(action);
// }
let isPromise=obj=>obj.then;
let promise=store=>next=>action=>{
	if (isPromise(action)) {
		return	action.then((data)=>next(data))
	}
	next(action)
}
let logger=store=>next=>action=>{
	console.log("before",store.getState());
	console.log(store.getState());
	next(action);//action改变后的状态
	console.log("after",store.getState());
}
let store=applyMiddleware(promise)(createStore)(counter)
store.subscribe(()=>{
	console.log(store.getState());
})
// store.dispatch({type:"ADD"})
// store.dispatch((dispatch)=>{
// 	setTimeout(()=>{
// 		dispatch({type:"ADD"})
// 	},3000)
// })
store.dispatch(new Promise((resolve,reject)=>{
		resolve({type:'ADD'})
}))
