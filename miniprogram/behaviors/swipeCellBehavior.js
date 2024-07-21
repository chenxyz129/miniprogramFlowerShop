//滑块复位
export const swipeCellBehavior = Behavior({
    data:{
        swipeQueue:[]
    },
    methods:{
        //打开滑块时将swipe实例添加到swipeQueue
        openSwipe(event){
            this.closeSwipe()
            const {id} =event.target.dataset
            this.data.swipeQueue.push(this.selectComponent(`#swipe-${id}`))
        },
        //统一关闭swipeQueue的swipecell
        closeSwipe(){
            this.data.swipeQueue.forEach((item)=>{
                item.close()
            })
            this.data.swipeQueue = []
        }
    }
})