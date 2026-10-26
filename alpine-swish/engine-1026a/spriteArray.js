class SpriteArray extends Array {
	constructor() {
		super();
		this.pushHandlers = [];
	}

	onPush(f, retroactive) {
		this.pushHandlers.push(f);
		if (retroactive) {
			this.forEach(f);
		}
	}

	push(obj) {
		super.push(obj);
		this.pushHandlers.forEach(handler => handler(obj));
	}

	cull() { for(let i=this.length-1;i>=0;i--)if(!this[i]||this[i].deleted)this.splice(i,1); }
}
export default SpriteArray;
