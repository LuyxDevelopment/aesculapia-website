export interface ResponseData<D = null> {
	error: boolean;
	message: string;
	data?: D | null;
}