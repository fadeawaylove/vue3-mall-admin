import { toast, showModal } from '~/utils/notify'
import { updatepassword, logout } from '~/api/manager'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'

export function userRepassword() {
    // 修改密码
    const router = useRouter()
    const store = useStore()

    const formDrawerRef = ref(null)
    const form = reactive({
        oldpassword: '',
        password: '',
        repassword: ''
    })

    const formRef = ref(null)
    const rules = {
        oldpassword: [
            { required: true, message: '旧密码不能为空', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '新密码不能为空', trigger: 'blur' },
        ],
        repassword: [
            { required: true, message: '确认密码不能为空', trigger: 'blur' },
        ]
    }

    const onSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) {
                return false
            }
            formDrawerRef.value.showLoading()

            updatepassword(form).then(res => {
                toast("修改密码成功，请重新登录")
                store.dispatch("logout")
                router.push("/login")

            }).finally(() => {
                formDrawerRef.value.hideLoading()
            })
        })
    }

    const openRepasswordForm = () => formDrawerRef.value.open()

    return {
        formDrawerRef,
        form,
        formRef,
        rules,
        onSubmit,
        openRepasswordForm
    }
}


export function userLogout() {
    const router = useRouter()
    const store = useStore()
    function handleLogout() {
        showModal("是否退出登录").then(res => {
            logout().finally(() => {
                store.dispatch("logout")
                router.push("/login")
                toast("退出登录成功")
            })
        })
    }
    return { handleLogout }
}