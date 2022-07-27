class Box {
    constructor (
        id
    )
    {
        this.date = new Date() + 9999999999;
        this.id = id;
        this.isFading = false;
    }
}

export default Box;