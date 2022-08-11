class Box {
    constructor (
        id
    )
    {
        this.startedFading = new Date();
        this.id = id;
        this.isFading = false;
    }
}

export default Box;