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
let isPromise=obj=>obj.then;//判断isPromise势力是否为promise对象
let promise=store=>next=>action=>{
	console.log(action,"vv");
	if (isPromise(action)) {
		console.log(action.then((data)=>next(data)));
		return	action.then((data)=>next(data))
	}
	next(action)
}
//如果传入多个中间件，许从左到右执行
let logger=store=>next=>action=>{
	console.log(next);
	console.log("logger   before",store.getState());
	next(action);//action改变后的状态
	console.log("logger   after",store.getState());
}
let logger1=store=>next=>action=>{
	console.log("logger1  before",store.getState());
	next(action);//action改变后的状态
	console.log("logger1  after",store.getState());
}
let store=applyMiddleware([logger,logger1,thunk])(createStore)(counter)
store.subscribe(()=>{
	console.log(store.getState());
})
store.dispatch({type:"ADD"})
// store.dispatch((dispatch)=>{
// 	setTimeout(()=>{
// 		dispatch({type:"ADD"})
// 	},3000)
// })
// store.dispatch(new Promise((resolve,reject)=>{
// 		resolve({type:'ADD'})
// }))
