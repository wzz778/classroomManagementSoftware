// 渲染数据的
class Barrage {
    constructor(options, ctx) {
        this.ctx = ctx
        // 设置是否初始化
        this.isInit = false
        // 判断是否还需要绘制
        this.flag = true
        // 归并到this上去
        Object.assign(this, options)
    }
    // 初始化
    init() {
        this.color = this.color || this.ctx.color
        this.fontSize = this.fontSize || this.ctx.fontSize
        this.speed = this.speed || this.ctx.speed
        // 获取宽度
        this.width = this.getWidth()
        // 获取宽度
        this.x = this.ctx.canvas.width
        // 获取高度
        this.y = Math.random() * this.ctx.canvas.height
        // 判断是否大于canvas的高度减去字体大小(如果大于就等于这个值)
        if (this.y > this.ctx.canvas.height - this.fontSize) {
            this.y = this.ctx.canvas.height - this.fontSize
        }
        if (this.y < this.fontSize) {
            this.y = this.fontSize
        }
    }
    // 获取宽度
    getWidth() {
        // 创建一个标签
        let span = document.createElement('span')
        span.innerText = this.value
        span.style.font = `${this.fontSize}px "Miscrosoft YaHei"`
        span.style.position = 'absolute'
        span.style.zIndex = -1
        //插入到body里边(方便获取宽度)
        document.body.appendChild(span)
        let width = span.clientWidth
        // 删除
        document.body.removeChild(span)
        return width
    }
    render() {
        this.ctx.context.font = `${this.fontSize}px "Miscrosoft YaHei"`
        this.ctx.context.fillStyle = this.color
        this.ctx.context.fillText(this.value, this.x, this.y)
    }
}
// 整体的流程控制
class Barrages {
    constructor(options) {
        if (!options.canvas || !options.video) {
            return
        }
        // 声明一个默认值
        const defaultOptions = {
            fontSize: 26,
            color: 'green',
            data: [],
            speed: 1
        }
        // 把这些东西都归并到this上
        Object.assign(this, defaultOptions, options)
        // 初始化canvas
        this.canvas.width = this.video.clientWidth
        this.canvas.height = this.video.clientHeight
        // 取出canvas上下文
        this.context = this.canvas.getContext('2d')
        // 将每个数据实例化(箭头函数的this)
        this.barrages = this.data.map((item) => new Barrage(item, this))
        // 是否需要播放弹幕
        this.isPlay = true
    }
    // 清除画布方法
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    setBarrage(data) {
        this.data.push(data)
        this.barrages.push(new Barrage(data, this))
    }
    // 渲染方法
    render() {
        // 清空画布
        this.clear()
        // 渲染新的画布
        this.renderBarrages()
        if (this.isPlay) {
            requestAnimationFrame(this.render.bind(this))
        }
    }
    // 绘制弹幕方法
    renderBarrages() {
        // 获取当前视频的时间
        const time = this.video.currentTime
        // 遍历数据
        this.barrages.forEach(item => {
            // 通过判断时间来确定其是否应该显示
            if (item.time <= time && item.flag) {
                // 判断是否应该初始化
                if (!item.isInit) {
                    item.init()
                    item.isInit = true
                }
                if (item.x < -item.width) {
                    item.flag = false
                }
                item.x = item.x - item.speed
                item.render()
            }
        })
    }
    // 暂停方法
    pause() {
        this.isPlay = false
        console.log('pause')
    }
}
export default Barrages