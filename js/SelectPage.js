class SelectPage{
    constructor(){
        //All page classes will need an extra class name like 'pageHolder' below.
        this.pageHolderList = document.body.querySelectorAll('.pageHolder')
        this.currentPage = ""
    }

    /**
     * Input div class name you want to show, all other classes will be hidden.
     * @param {String} classStringIn
     */
    showPage(classStringIn){
        for(let pageEl of this.pageHolderList){
            if(!pageEl.classList.contains(classStringIn)){
                pageEl.classList.add('hiddenPage')
            }
            else{
                pageEl.classList.remove('hiddenPage')
            }
        }
        this.currentPage = classStringIn
    }

    getCurrentPage(){
        return this.currentPage
    }
}