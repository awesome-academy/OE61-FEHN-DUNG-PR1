import { users } from "@/data/sampleData"

interface LoginProps {
    email: string;
    password: string;
}

export const login = ({ email, password }: LoginProps) => {
    const findUser = users.find((user) => user.email === email);
    if (!findUser) {
        return {
            success: false,
            message: "Email không tồn tại"
        }
    }
    if (findUser?.password !== password) {
        return {
            success: false,
            message: "Mật khẩu không đúng"
        }
    }

    return {
        success: true,
        message: "Đăng nhập thành công",
        data: findUser
    }
}
