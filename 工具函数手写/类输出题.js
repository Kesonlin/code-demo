class Student {
    constructor(name) {
        this.name = name
    }

    getInfo() {
        return {
            name: 'Tome',
            getName() {
                console.log(this.name);
                return this.name
            }
        }
    }
}

const stu = new Student('lili')
stu.getInfo().getName()  // Tom !!!

const obj = {
    name: 'yy',

    getInfo() {
        console.log(this);
        return {
            name: 'll',
            getName: () => {
                console.log(this);
                console.log(this.name);
                return this.name
            }
        }
    }
}

obj.getInfo().getName()