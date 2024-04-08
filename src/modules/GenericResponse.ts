

export default class GenericResponse<T> {
    status: number;
    data: T;
    constructor(status: number, data: T) {
        this.status = status;
        this.data = data;
    }
}