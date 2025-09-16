class Group {
    constructor() {
        this.members = [];
    }

    add(value) {
        if (!this.has(value)) {
            this.members.push(value);
        }
    }
    delete(value) {
        this.members = this.members.filter(v => v !== value);
    }
    has(value) {
        return this.members.includes(value);
    }

    static from(iterable) {
        const group = new Group();
        for (let item of iterable) {
            group.add(item);
        }
        return group;
    }

    [Symbol.iterator]() {
        let index = 0;
        const members = this.members;
        return {
            next() {
                if (index < members.length) {
                    return { value: members[index++], done: false };
                } else {
                    return { done: true };
                }

            }
        };
    }
}

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
}