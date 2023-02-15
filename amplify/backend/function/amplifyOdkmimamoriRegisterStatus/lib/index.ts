import {
    APIGatewayEventRequestContext,
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from 'aws-lambda';
import { Factory } from './Factory';
import { GetItemService } from './service/GetItemService';
import { GetRegisterItemService } from './service/GetRegisterItemService';

/**
 * biblleアカウント (biblleMailAddress) をキーに登録状況を取得
 * @param event 
 * @param context 
 * @returns ユーザー情報（ONE会員ステータス、ONE UID）
 */
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (
    event: APIGatewayProxyEvent, 
    context: APIGatewayEventRequestContext,
    dummy?:any, 
    getServiceItem?: GetItemService,
    getServiceRegisterItem?: GetRegisterItemService
): Promise<APIGatewayProxyResult> => {
    console.log(event)
    let biblleMailAddress: string;
    const getItemService = injectDependency(getServiceItem);
    const getRegisterItemService = injectDependency2(getServiceRegisterItem);

    try {
        biblleMailAddress = getBiblleMailAddress(event);
        console.log('biblleMailAddress: ' + biblleMailAddress);
    } catch (e) {
        console.error(event)
        return {
            "statusCode": 400,
            // "headers": {},
            "headers": {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Methods": "OPTIONS,GET"
            },
            "body": JSON.stringify({ "msg": "Request Parameter is Invalid" }),
            "isBase64Encoded": false
        }
    }

    try {
        // 配信登録情報および認証ステータス取得
        // RegisterItem[]
        // export type RegisterItem = {
        //     tagName: string;
        //     deliveryMail: string;
        //     isAuthenticated: boolean;
        // }
        // 配列か、配列形式の文字列
        let registerItems: any[] = await getRegisterItemService.getRegisterItem(biblleMailAddress);
        console.log(registerItems);
        // ユーザー情報取得
        // let data: string = await getItemService.getItem(biblleMailAddress);
        let data: string = await getItemService.getItem(biblleMailAddress, registerItems);
        console.log('data: ' + data)
        return {
            "statusCode": 200,
            // "headers": {},
            "headers": {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Methods": "OPTIONS,GET"
            },
            "body": data,
            "isBase64Encoded": false
        }
    } catch (e) {
        return {
            "statusCode": 503,
            // "headers": {},
            "headers": {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Methods": "OPTIONS,GET"
            },
            "body": JSON.stringify({ "msg": "Delivered Info get operation is failed" }),
            "isBase64Encoded": false
        }
    }
}

function injectDependency(getItemService?: GetItemService): GetItemService {
    return getItemService ?? new Factory().getItemServiceInstance();
}

function injectDependency2(getRegisterItemService?: GetRegisterItemService): GetRegisterItemService {
    return getRegisterItemService ?? new Factory().getRegisterItemServiceInstance();
}

function getBiblleMailAddress(event: APIGatewayProxyEvent): string {
    // const biblleMailAddress = event?.pathParameters?.biblleMailAddress;
    const biblleMailAddress = event?.pathParameters?.email;
    if (biblleMailAddress == undefined) {
        throw new Error("biblleMailAddress is undefined");
    }
    return biblleMailAddress;
}

