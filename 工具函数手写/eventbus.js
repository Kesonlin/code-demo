class EventBus {
    constructor() {
        this.eventObj = {}
        this.id = 0
    }

    $on(name, callback) {
        if (!this.eventObj[name]) {
            this.eventObj[name] = {}
        }
        const id = this.id++
        this.eventObj[name][id] = callback

        return id
    }

    $emit(name, ...args) {
        const cbs = this.eventObj[name]

        for(const id in cbs) {
            cbs[id](...args)
            if(id.indexOf('D') != -1) {
                delete cbs[id]
            }
        }
    }

    $off(name, id) {
        delete this.eventObj[name][id]
        // 如果这是最后一个订阅者，则删除整个对象
        if (!Object.keys(this.eventObj[name]).length) {
            delete this.eventObj[name];
        }
    }

    $once(name, cb) {
          // 判断是否存储过
      if (!this.eventObj[name]) {
        this.eventObj[name] = {};
      }

      const id = 'D' + this.id++
      this.eventObj[name][id] = cb

      return id
    }
}

  // 初始化EventBus
  let EB = new EventBus();


  // 订阅事件
  EB.$on('key1', (name, age) => {
    console.info("我是订阅事件A:", name, age);
  })
  EB.$once("key1", (name, age) => {
    console.info("我是订阅事件B:", name, age);
  })
  EB.$on("key2", (name) => {
    console.info("我是订阅事件C:", name);
  })


  // 发布事件key1
  EB.$emit('key1', "小猪课堂", 26);
  console.info("在触发一次key1")
  EB.$emit('key1', "小猪课堂", 26);
  // 发布事件
  EB.$emit('key2', "小猪课堂");

