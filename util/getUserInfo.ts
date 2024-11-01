import { UserService } from "../api/userService";

export class GetUserInfoUtil {

	static getUserInfo = async (Id : number) => {
		const userInfo = await UserService.SerachAUserbyUserID({ userID: Id });
		return userInfo.UserName;
	}
}
