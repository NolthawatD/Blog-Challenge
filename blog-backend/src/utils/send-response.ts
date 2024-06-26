import { HttpException, HttpStatus } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';

const sendResponse = async (response: unknown, httpStatus: HttpStatus, errText?: String ) => {
	if (Array.isArray(response)) {
		return {
			status: httpStatus,
			datas : response,
			messageErr:  errText,
			responseId:  uuidv4()
		};
	} else {
		return {
			status: httpStatus,
			data : response,
			messageErr:  errText,
			responseId: uuidv4()
		};
	}
}

const sendError = async (httpStatus: HttpStatus, errText: String) => {
	throw new HttpException({
		status: httpStatus,
		message: errText || 'Something wrong',
		responseId:  uuidv4()
	}, httpStatus);
}

export {
	sendResponse,
	sendError,
}