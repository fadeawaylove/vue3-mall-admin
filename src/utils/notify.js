import { ElNotification } from "element-plus";

// 消息提示
export function toast(message, type = "success", duration = 2000, dangerouslyUseHTMLString = false) {
    ElNotification({
        type: type,
        message: message,
        dangerouslyUseHTMLString: dangerouslyUseHTMLString,
        duration: duration,
    })
}

