let sum=(a,b)=>a+b;
let upper=str=>str.toUpperCase();
// let result=upper(sum('a','b'))
let result=compose(sum,upper)('a','b')
function compose(...fns){
	return function(...args){
		let last=fns.pop();
		return fns.reduceRight((composed,fn)=>{
			return fn(composed);
		},last(...args))
	}
}
console.log(result);
