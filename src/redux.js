let createStore=(reducer)=>{
	let state;
	let listeners=[];
	let getState=()=>state;
	let subscribe=(listener)=>{
		listeners.push(listener);
		return ()=>{
			listeners=listeners.filter(l=>listener!==l)
		}
	}
	let dispatch=(action)=>{
		state=reducer(state,action);
		listeners.forEach(listener=>listener())
	}
	dispatch();
	return{
		getState,
		subscribe,
		dispatch
	}
}
function compose(...fns){
	return function(...args){
		let last=fns.pop();
		return fns.reduceRight((composed,fn)=>{
			return fn(composed);
		},last(...args))
	}
}
let applyMiddleware=(middlewares)=>{
	 return (createStore)=>reducer=>{
		 let store=createStore(reducer);
		 middlewares=middlewares.map((middleware)=>middleware(store));
		 let dispatch=compose(...middlewares)(store.dispatch);//next(action)
		 return {
			 ...store,dispatch
		 }
	 }
}
export {createStore,applyMiddleware}
